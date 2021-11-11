import express, { Router } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { connect } from 'mongoose';
import rateLimit from 'express-rate-limit';
import path from 'path';
import config from './services/dotenv/config';

// Queue provider service
import BullQueueProvider from './app/providers/queue/implementations/BullQueueProvider';
import { pinoLogger } from './services/pino/pinoLogger';

export class App {
  public express: express.Application;
  public port: string | 5000 = process.env.PORT || 5000;

  constructor(private routes: Router) {
    config();
    this.express = express();
    this.startQueue();
    this.middlewares();
  }

  public listen(): void {
    this.database();

    this.express.on('connectReady', () => {
      this.express.listen(this.port, () => {
        console.log('listening on port ' + this.port);
      });
    });
  }

  private startQueue(): void {
    BullQueueProvider.process();
  }

  private database(): void {
    connect(process.env.CONNECTION as string)
      .then(() => {
        this.express.emit('connectReady');
        console.log('database connected');
      })
      .catch((err) => {
        pinoLogger('fatal', err.message);
      });
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(helmet());
    this.express.use(cookieParser());
    this.express.use(express.urlencoded({ limit: '20mb', extended: true }));
    this.express.use(express.static(path.resolve(__dirname, '..', 'public')));

    const whitelist = [
      'http://localhost:3001',
      'https://starburst-qr.online',
      'https://www.starburst-qr.online',
    ];
    const corsOptions = (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    };

    this.express.use(
      cors({
        origin: corsOptions,
        credentials: true,
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
      }),
    );

    this.express.use(this.routes);
    this.express.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
      }),
    );
    this.express.set('trust proxy', 1);
  }
}

export default App;

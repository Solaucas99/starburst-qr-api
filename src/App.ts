import express, { Router } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { connect } from 'mongoose';
import rateLimit from 'express-rate-limit';
import config from './services/dotenv/config';

// Queue provider service
import BullQueueProvider from './app/providers/queue/implementations/BullQueueProvider';
import { pinoLogger } from './services/pino/pinoLogger';

export class App {
  public express: express.Application;
  public port: string | 3000 = process.env.API_PORT || 3000;

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
    this.express.use(
      cors({
        origin: 'http://localhost:3001',
        credentials: true,
      }),
    );
    this.express.use(express.static('./public'));
    this.express.use(this.routes);
    this.express.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
      }),
    );
    this.express.set('trust proxy', 'loopback');
  }
}

export default App;

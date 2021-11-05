import pinoms from 'pino-multi-stream';
import fs from 'fs';

type TLogLevel = 'info' | 'warn' | 'error' | 'fatal';

export function pinoLogger(level: TLogLevel, message: string): void {
  const prettyStream = pinoms.prettyStream({
    prettyPrint: {
      colorize: true,
      translateTime: 'SYS:standart',
    },
  });

  if (!fs.existsSync(`./logs/${level}`)) {
    fs.mkdir(`./logs/${level}`, (err) => {
      if (err) throw err;
    });
  }

  const streams = [
    {
      level,
      stream: fs.createWriteStream(`./logs/${level}/${level}.log`, {
        flags: 'a',
      }),
    },
    {
      stream: prettyStream,
    },
  ];

  const pino = pinoms({ streams });

  pino[level](message);
}

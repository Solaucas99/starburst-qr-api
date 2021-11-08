import config from '../../../../services/dotenv/config';

config();

export default {
  redis: {
    host: process.env.REDIS_URL as string,
    port: Number(process.env.REDIS_PORT),
  },
  url: process.env.REDIS_URL as string,
};

import config from '../../../../services/dotenv/config';

config();

export default {
  redis: {
    host: process.env.REDIS_HOST as string,
    port: Number(process.env.REDIS_PORT),
  },
};

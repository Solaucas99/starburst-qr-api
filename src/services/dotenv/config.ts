import dotenv from 'dotenv';
function config(): void {
  dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  });
}

export default config;

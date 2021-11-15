import { Request, Response } from 'express';
import { pinoLogger } from '../../../pino/pinoLogger';
import { LoginUserUseCase } from './LoginUserUseCase';
import config from '../../../../services/dotenv/config';

config();

export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {
    this.handle = this.handle.bind(this);
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    try {
      const data = await this.loginUserUseCase.loginUser({
        username,
        password,
      });

      return res.status(200).json(data);
    } catch (err: any) {
      pinoLogger('error', err.message);
      return res.status(400).json({
        message: err.message || 'Unexpected error',
      });
    }
  }
}

import { Request, Response } from 'express';
import { pinoLogger } from '../../../pino/pinoLogger';
import { GetUserUseCase } from './GetUserUseCase';

export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {
    this.getUser = this.getUser.bind(this);
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const { accessToken } = req.cookies;

      const data = await this.getUserUseCase.getUser(accessToken);

      return res.status(200).json({ data });
    } catch (err: any) {
      pinoLogger('error', err.message);
      return res.status(400).json({
        message: err.message || 'Unexpected error',
      });
    }
  }
}

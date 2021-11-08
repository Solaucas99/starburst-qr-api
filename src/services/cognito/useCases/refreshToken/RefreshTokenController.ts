import { Request, Response } from 'express';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';
import { RefreshTokenProtocol } from '../../../../interfaces/AWSCognito/RefreshTokenProtocol';
import { pinoLogger } from '../../../pino/pinoLogger';
import config from '../../../../services/dotenv/config';

config();

export class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {
    this.handle = this.handle.bind(this);
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const { refresh_token }: RefreshTokenProtocol = req.body;

    if (!refresh_token)
      return res.status(400).json({ message: 'Refresh token não enviado' });

    try {
      const data = await this.refreshTokenUseCase.refreshToken({
        refresh_token,
      });

      res.cookie('idToken', data.AuthenticationResult?.IdToken, {
        httpOnly: false,
        maxAge: 1000 * 60 * 60,
        secure: true,
        domain: process.env.FRONTEND_DOMAIN,
      });

      res.cookie('accessToken', data.AuthenticationResult?.AccessToken, {
        httpOnly: false,
        maxAge: 1000 * 60 * 60,
        secure: true,
        domain: process.env.FRONTEND_DOMAIN,
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

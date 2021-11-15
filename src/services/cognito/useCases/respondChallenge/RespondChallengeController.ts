import { Request, Response } from 'express';
import { RespondChallengeUseCase } from './RespondChallengeUseCase';
import { RespondChallengeProtocol } from '../../../../interfaces/AWSCognito/RespondChallengeProtocol';
import { pinoLogger } from '../../../pino/pinoLogger';
import config from '../../../../services/dotenv/config';

config();

export class RespondChallengeController {
  constructor(private respondChallengeUseCase: RespondChallengeUseCase) {
    this.handle = this.handle.bind(this);
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const {
      username,
      password,
      auth_challenge,
      name,
      nickname,
      phone_number,
    }: RespondChallengeProtocol = req.body;

    try {
      const data = await this.respondChallengeUseCase.respondChallenge({
        username,
        password,
        auth_challenge,
        name,
        nickname,
        phone_number,
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

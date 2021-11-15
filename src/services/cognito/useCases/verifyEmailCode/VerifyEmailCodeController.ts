import { Request, Response } from 'express';
import { pinoLogger } from '../../../pino/pinoLogger';
import { VerifyEmailCodeUseCase } from './VerifyEmailCodeUseCase';
// import { ResendSignUpCodeProtocol } from '../../../../interfaces/AWSCognito/ResendSignUpCodeProtocol';

export class VerifyEmailCodeController {
  constructor(private verifyEmailCodeUseCase: VerifyEmailCodeUseCase) {
    this.handle = this.handle.bind(this);
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const header: string[] | undefined = req.headers.authorization?.split(',');

    const access_token = header ? header[1].replace(' Basic ', '') : undefined;
    const { code } = req.body;
    const username = req.payload['cognito:username'];

    if (!code)
      return res.status(400).json({ message: 'O código precisa ser enviado!' });

    if (!access_token)
      return res
        .status(401)
        .json({ message: 'Ocorreu um erro com o usuário, tente novamente!' });

    try {
      await this.verifyEmailCodeUseCase.verifyCode({
        access_token,
        code,
      });

      return res.status(200).json({
        message: `Bem-vindo ${username}. Seu cadastro foi confirmado com sucesso!`,
      });
    } catch (err: any) {
      pinoLogger('error', err.message);
      return res.status(400).json({
        message: err.message || 'Unexpected error',
      });
    }
  }
}

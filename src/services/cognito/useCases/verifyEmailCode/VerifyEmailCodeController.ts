import { Request, Response } from 'express';
import { VerifyEmailCodeUseCase } from './VerifyEmailCodeUseCase';
// import { ResendSignUpCodeProtocol } from '../../../../interfaces/AWSCognito/ResendSignUpCodeProtocol';

export class VerifyEmailCodeController {
  constructor(private verifyEmailCodeUseCase: VerifyEmailCodeUseCase) {
    this.handle = this.handle.bind(this);
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const access_token = req.cookies.accessToken;
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
      console.log(err);
      return res.status(400).json({
        message: err.message || 'Unexpected error',
      });
    }
  }
}

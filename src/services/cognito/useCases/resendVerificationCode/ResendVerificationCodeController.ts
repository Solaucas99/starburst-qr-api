import { Request, Response } from 'express';
import { ResendVerificationCodeUseCase } from './ResendVerificationCodeUseCase';
// import { ResendSignUpCodeProtocol } from '../../../../interfaces/AWSCognito/ResendSignUpCodeProtocol';

export class ResendVerificationCodeController {
  constructor(
    private resendVerificationCodeUseCase: ResendVerificationCodeUseCase,
  ) {
    this.handle = this.handle.bind(this);
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const access_token = req.cookies.accessToken;

    if (!access_token)
      return res
        .status(401)
        .json({ message: 'Ocorreu um erro com o usuário, tente novamente!' });

    try {
      const { CodeDeliveryDetails } =
        await this.resendVerificationCodeUseCase.resendCode({
          access_token,
        });

      if (!CodeDeliveryDetails)
        return res.status(400).json({ message: 'Unexpected error' });

      return res.status(200).json({
        message: 'Código re-enviado com sucesso!',
        destination: CodeDeliveryDetails?.Destination,
      });
    } catch (err: any) {
      console.log(err);
      return res.status(400).json({
        message: err.message || 'Unexpected error',
      });
    }
  }
}

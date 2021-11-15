import { Request, Response } from 'express';
import { pinoLogger } from '../../../pino/pinoLogger';
import { ResendVerificationCodeUseCase } from './ResendVerificationCodeUseCase';
// import { ResendSignUpCodeProtocol } from '../../../../interfaces/AWSCognito/ResendSignUpCodeProtocol';

export class ResendVerificationCodeController {
  constructor(
    private resendVerificationCodeUseCase: ResendVerificationCodeUseCase,
  ) {
    this.handle = this.handle.bind(this);
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const header: string[] | undefined = req.headers.authorization?.split(',');

    const access_token = header ? header[1].replace(' Basic ', '') : undefined;

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
      pinoLogger('error', err.message);
      return res.status(400).json({
        message: err.message || 'Unexpected error',
      });
    }
  }
}

import { ResendVerificationCodeProtocol } from '../../../../interfaces/AWSCognito/ResendVerificationCodeProtocol';
import {
  ResendVerificationCodeProviderProtocol,
  ResendVerificationCodeResponse,
} from '../../providers/ResendVerificationCodeProviderProtocol';

export class ResendVerificationCodeUseCase {
  constructor(
    private resendCodeProvider: ResendVerificationCodeProviderProtocol,
  ) {}

  public async resendCode(
    attr: ResendVerificationCodeProtocol,
  ): Promise<ResendVerificationCodeResponse> {
    try {
      const data = await this.resendCodeProvider.resendCode(attr);
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

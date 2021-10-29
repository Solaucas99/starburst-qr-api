import { VerifyEmailCodeProtocol } from '../../../../interfaces/AWSCognito/VerifyEmailCodeProtocol';
import {
  VerifyEmailCodeProviderProtocol,
  VerifyEmailCodeResponse,
} from '../../providers/VerifyEmailCodeProviderProtocol';

export class VerifyEmailCodeUseCase {
  constructor(
    private verifyEmailCodeProvider: VerifyEmailCodeProviderProtocol,
  ) {}

  public async verifyCode(
    attr: VerifyEmailCodeProtocol,
  ): Promise<VerifyEmailCodeResponse> {
    try {
      const data = await this.verifyEmailCodeProvider.verifyCode(attr);
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

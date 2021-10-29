import { ConfirmUserSignUpProtocol } from '../../../../interfaces/AWSCognito/ConfirmUserSignUpProtocol';
import { SignUpUserProtocol } from '../../../../interfaces/AWSCognito/SignUpUserProtocol';
import {
  SignUpServiceProviderProtocol,
  SignUpResponse,
} from '../../providers/SignUpServiceProviderProtocol';

export class SignUpUserUseCase {
  constructor(private signUpServiceProvider: SignUpServiceProviderProtocol) {}

  public async signUpUser(user: SignUpUserProtocol): Promise<SignUpResponse> {
    try {
      const data = await this.signUpServiceProvider.signUpUser(user);
      return data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async confirmUserSignUp(
    confirmAttr: ConfirmUserSignUpProtocol,
  ): Promise<void> {
    try {
      await this.signUpServiceProvider.confirmSignUpUser(confirmAttr);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

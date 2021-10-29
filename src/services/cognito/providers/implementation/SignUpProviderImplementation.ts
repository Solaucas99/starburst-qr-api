import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { SignUpUserProtocol } from '../../../../interfaces/AWSCognito/SignUpUserProtocol';
import {
  SignUpServiceProviderProtocol,
  SignUpResponse,
  ConfirmSignUpResponse,
} from '../SignUpServiceProviderProtocol';
import config from '../../../dotenv/config';
import { ConfirmUserSignUpProtocol } from '../../../../interfaces/AWSCognito/ConfirmUserSignUpProtocol';

export class SignUpProviderImplementation
  implements SignUpServiceProviderProtocol
{
  private cognitoServiceProvider;

  constructor() {
    config();
    this.cognitoServiceProvider = new CognitoIdentityServiceProvider({
      region: process.env.AWS_REGION,
    });
  }

  public async signUpUser(user: SignUpUserProtocol): Promise<SignUpResponse> {
    try {
      const data = await this.cognitoServiceProvider
        .signUp({
          ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID as string,
          Username: user.username,
          Password: user.password,
          UserAttributes: [
            { Name: 'name', Value: user.name },
            { Name: 'custom:cpf_number', Value: user.cpf_number },
            { Name: 'email', Value: user.email },
            { Name: 'nickname', Value: user.username },
            { Name: 'phone_number', Value: user.phone_number },
          ],
        })
        .promise();

      if (data.$response.error) {
        throw new Error(data.$response.error.message);
      }

      return data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async confirmSignUpUser(
    confirmAttr: ConfirmUserSignUpProtocol,
  ): Promise<ConfirmSignUpResponse> {
    try {
      console.log(confirmAttr);
      const data = await this.cognitoServiceProvider
        .confirmSignUp({
          ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID as string,
          Username: confirmAttr.username,
          ConfirmationCode: confirmAttr.confirmation_code,
        })
        .promise();

      if (data.$response.error) {
        throw new Error(data.$response.error.message);
      }

      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

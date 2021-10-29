import { CognitoIdentityServiceProvider } from 'aws-sdk';
import dotenv from 'dotenv';
import { LoginUserProtocol } from '../../../../interfaces/AWSCognito/LoginUserProtocol';
import {
  LoginServiceProviderProtocol,
  LoginResponse,
} from '../LoginServiceProviderProtocol';

export class LoginProviderImplementation
  implements LoginServiceProviderProtocol
{
  private cognitoServiceProvider;

  constructor() {
    dotenv.config();
    this.cognitoServiceProvider = new CognitoIdentityServiceProvider({
      region: process.env.AWS_REGION,
    });
  }
  async loginUser(user: LoginUserProtocol): Promise<LoginResponse> {
    try {
      const data = await this.cognitoServiceProvider
        .initiateAuth({
          AuthFlow: process.env.AWS_COGNITO_AUTH_FLOW as string,
          ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID as string,
          AuthParameters: {
            USERNAME: user.username,
            PASSWORD: user.password,
          },
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

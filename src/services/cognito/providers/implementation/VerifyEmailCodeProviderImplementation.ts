import { CognitoIdentityServiceProvider } from 'aws-sdk';
import dotenv from 'dotenv';
import { VerifyEmailCodeProtocol } from '../../../../interfaces/AWSCognito/VerifyEmailCodeProtocol';
import {
  VerifyEmailCodeResponse,
  VerifyEmailCodeProviderProtocol,
} from '../VerifyEmailCodeProviderProtocol';

export class VerifyEmailCodeProviderImplementation
  implements VerifyEmailCodeProviderProtocol
{
  private cognitoServiceProvider;

  constructor() {
    dotenv.config();
    this.cognitoServiceProvider = new CognitoIdentityServiceProvider({
      region: process.env.AWS_REGION,
    });
  }
  async verifyCode(
    attr: VerifyEmailCodeProtocol,
  ): Promise<VerifyEmailCodeResponse> {
    try {
      const data = await this.cognitoServiceProvider
        .verifyUserAttribute({
          AccessToken: attr.access_token,
          AttributeName: 'email',
          Code: attr.code,
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

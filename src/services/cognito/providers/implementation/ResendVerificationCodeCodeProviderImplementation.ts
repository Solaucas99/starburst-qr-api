import { CognitoIdentityServiceProvider } from 'aws-sdk';
import dotenv from 'dotenv';
import { ResendVerificationCodeProtocol } from '../../../../interfaces/AWSCognito/ResendVerificationCodeProtocol';
import {
  ResendVerificationCodeProviderProtocol,
  ResendVerificationCodeResponse,
} from '../ResendVerificationCodeProviderProtocol';

export class ResendVerificationCodeProviderImplementation
  implements ResendVerificationCodeProviderProtocol
{
  private cognitoServiceProvider;

  constructor() {
    dotenv.config();
    this.cognitoServiceProvider = new CognitoIdentityServiceProvider({
      region: process.env.AWS_REGION,
    });
  }
  async resendCode(
    attr: ResendVerificationCodeProtocol,
  ): Promise<ResendVerificationCodeResponse> {
    try {
      const data = await this.cognitoServiceProvider
        .getUserAttributeVerificationCode({
          AccessToken: attr.access_token,
          AttributeName: 'email',
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

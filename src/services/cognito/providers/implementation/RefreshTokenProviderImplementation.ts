import { CognitoIdentityServiceProvider } from 'aws-sdk';
import dotenv from 'dotenv';
import { RefreshTokenProtocol } from '../../../../interfaces/AWSCognito/RefreshTokenProtocol';
import {
  RefreshTokenProviderProtocol,
  RefreshTokenResponse,
} from '../RefreshTokenProviderProtocol';

export class RefreshTokenProviderImplementation
  implements RefreshTokenProviderProtocol
{
  private cognitoServiceProvider;

  constructor() {
    dotenv.config();
    this.cognitoServiceProvider = new CognitoIdentityServiceProvider({
      region: process.env.AWS_REGION,
    });
  }
  async refreshToken(
    token: RefreshTokenProtocol,
  ): Promise<RefreshTokenResponse> {
    try {
      const data = await this.cognitoServiceProvider
        .initiateAuth({
          AuthFlow: 'REFRESH_TOKEN_AUTH',
          ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID as string,
          AuthParameters: {
            REFRESH_TOKEN: token.refresh_token,
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

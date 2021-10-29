import { CognitoIdentityServiceProvider } from 'aws-sdk';
import dotenv from 'dotenv';

import {
  GetUserProviderProtocol,
  GetUserResponse,
} from '../GetUserProviderProtocol';

export class GetUserProviderImplementation implements GetUserProviderProtocol {
  private cognitoServiceProvider;
  constructor() {
    dotenv.config();

    this.cognitoServiceProvider = new CognitoIdentityServiceProvider({
      region: process.env.AWS_REGION,
    });
  }
  async getUser(acc_token: string): Promise<GetUserResponse> {
    try {
      const data = await this.cognitoServiceProvider
        .getUser({
          AccessToken: acc_token,
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

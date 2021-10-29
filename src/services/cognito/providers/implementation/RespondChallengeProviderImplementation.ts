import { CognitoIdentityServiceProvider } from 'aws-sdk';
import dotenv from 'dotenv';
import { RespondChallengeProtocol } from '../../../../interfaces/AWSCognito/RespondChallengeProtocol';
import {
  RespondChallengeProviderProtocol,
  AuthResponse,
} from '../RespondChallengeProviderProtocol';

export class RespondChallengeProviderImplementation
  implements RespondChallengeProviderProtocol
{
  private cognitoServiceProvider;

  constructor() {
    dotenv.config();
    this.cognitoServiceProvider = new CognitoIdentityServiceProvider({
      region: process.env.AWS_REGION,
    });
  }
  async respondChallenge(
    attr: RespondChallengeProtocol,
  ): Promise<AuthResponse> {
    try {
      const data = await this.cognitoServiceProvider
        .respondToAuthChallenge({
          ChallengeName: attr.auth_challenge.challenge_name,
          ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID as string,
          Session: attr.auth_challenge.session,
          ChallengeResponses: {
            USERNAME: attr.username,
            NEW_PASSWORD: attr.password,
            ['userAttributes.name']: attr.name,
            ['userAttributes.nickname']: attr.nickname,
            ['userAttributes.phone_number']: attr.phone_number,
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

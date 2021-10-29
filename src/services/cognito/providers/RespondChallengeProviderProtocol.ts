import { RespondChallengeProtocol } from '../../../interfaces/AWSCognito/RespondChallengeProtocol';

export type AuthResponse =
  AWS.CognitoIdentityServiceProvider.RespondToAuthChallengeResponse;

export interface RespondChallengeProviderProtocol {
  respondChallenge(user: RespondChallengeProtocol): Promise<AuthResponse>;
}

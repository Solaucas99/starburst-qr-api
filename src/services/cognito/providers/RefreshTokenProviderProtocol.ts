import { RefreshTokenProtocol } from '../../../interfaces/AWSCognito/RefreshTokenProtocol';

export type RefreshTokenResponse =
  AWS.CognitoIdentityServiceProvider.InitiateAuthResponse;

export interface RefreshTokenProviderProtocol {
  refreshToken(token: RefreshTokenProtocol): Promise<RefreshTokenResponse>;
}

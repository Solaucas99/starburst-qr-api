import { LoginUserProtocol } from '../../../interfaces/AWSCognito/LoginUserProtocol';

export type LoginResponse =
  AWS.CognitoIdentityServiceProvider.InitiateAuthResponse;

export interface LoginServiceProviderProtocol {
  loginUser(user: LoginUserProtocol): Promise<LoginResponse>;
}

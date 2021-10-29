import { VerifyEmailCodeProtocol } from '../../../interfaces/AWSCognito/VerifyEmailCodeProtocol';

export type VerifyEmailCodeResponse =
  AWS.CognitoIdentityServiceProvider.VerifyUserAttributeResponse;

export interface VerifyEmailCodeProviderProtocol {
  verifyCode(attr: VerifyEmailCodeProtocol): Promise<VerifyEmailCodeResponse>;
}

import { ResendVerificationCodeProtocol } from '../../../interfaces/AWSCognito/ResendVerificationCodeProtocol';

export type ResendVerificationCodeResponse =
  AWS.CognitoIdentityServiceProvider.GetUserAttributeVerificationCodeResponse;

export interface ResendVerificationCodeProviderProtocol {
  resendCode(
    attr: ResendVerificationCodeProtocol,
  ): Promise<ResendVerificationCodeResponse>;
}

import { SignUpUserProtocol } from '../../../interfaces/AWSCognito/SignUpUserProtocol';
import { ConfirmUserSignUpProtocol } from '../../../interfaces/AWSCognito/ConfirmUserSignUpProtocol';

export type SignUpResponse = AWS.CognitoIdentityServiceProvider.SignUpResponse;
export type ConfirmSignUpResponse =
  AWS.CognitoIdentityServiceProvider.ConfirmSignUpResponse;

export interface SignUpServiceProviderProtocol {
  signUpUser(user: SignUpUserProtocol): Promise<SignUpResponse>;

  confirmSignUpUser(
    confirmAttr: ConfirmUserSignUpProtocol,
  ): Promise<ConfirmSignUpResponse>;
}

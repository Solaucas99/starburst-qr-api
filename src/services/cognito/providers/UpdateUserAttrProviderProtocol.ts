import { UpdateUserAttributesProtocol } from '../../../interfaces/AWSCognito/UpdateUserAttributesProtocol';
import { ConfirmUpdateUserAttrProtocol } from '../../../interfaces/AWSCognito/ConfirmUpdateUserAttrProtocol';

export type UpdateUserResponse =
  AWS.CognitoIdentityServiceProvider.UpdateUserAttributesResponse;

export type ConfirmUserUpdateResponse =
  AWS.CognitoIdentityServiceProvider.VerifyUserAttributeResponse;

export interface UpdateUserAttrProviderProtocol {
  updateUserAttr(
    updateAttr: UpdateUserAttributesProtocol,
  ): Promise<UpdateUserResponse>;

  // Only confirm if update attr was email or phone number.
  confirmUserAttrUpdate(
    confirmAttr: ConfirmUpdateUserAttrProtocol,
  ): Promise<ConfirmUserUpdateResponse>;
}

import {
  UpdateUserAttrProviderProtocol,
  ConfirmUserUpdateResponse,
  UpdateUserResponse,
} from '../UpdateUserAttrProviderProtocol';
import config from '../../../dotenv/config';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { ConfirmUpdateUserAttrProtocol } from '../../../../interfaces/AWSCognito/ConfirmUpdateUserAttrProtocol';
import { UpdateUserAttributesProtocol } from '../../../../interfaces/AWSCognito/UpdateUserAttributesProtocol';

export class UpdateUserAttrImplementation
  implements UpdateUserAttrProviderProtocol
{
  private cognitoServiceProvider;
  constructor() {
    config();
    this.cognitoServiceProvider = new CognitoIdentityServiceProvider({
      region: process.env.AWS_REGION,
    });
  }

  public async updateUserAttr(
    updateAttr: UpdateUserAttributesProtocol,
  ): Promise<UpdateUserResponse> {
    try {
      const data = await this.cognitoServiceProvider
        .updateUserAttributes({
          AccessToken: updateAttr.accessToken,
          UserAttributes: [updateAttr.attribute],
        })
        .promise();

      if (data.$response.error) {
        throw new Error(data.$response.error.message);
      }

      return data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async confirmUserAttrUpdate(
    confirmAttr: ConfirmUpdateUserAttrProtocol,
  ): Promise<ConfirmUserUpdateResponse> {
    try {
      const data = await this.cognitoServiceProvider
        .verifyUserAttribute({
          AccessToken: confirmAttr.acc_token,
          AttributeName: confirmAttr.attribute,
          Code: confirmAttr.confirmation_code,
        })
        .promise();

      if (data.$response.error) {
        throw new Error(data.$response.error.message);
      }

      return data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}

import { ConfirmUpdateUserAttrProtocol } from '../../../../interfaces/AWSCognito/ConfirmUpdateUserAttrProtocol';
import { UpdateUserAttributesProtocol } from '../../../../interfaces/AWSCognito/UpdateUserAttributesProtocol';
import {
  UpdateUserAttrProviderProtocol,
  UpdateUserResponse,
} from '../../providers/UpdateUserAttrProviderProtocol';

export class UpdateUserAttrUseCase {
  constructor(private updateUserAttrProvider: UpdateUserAttrProviderProtocol) {}

  public async updateUserAttr(
    updateAttr: UpdateUserAttributesProtocol,
  ): Promise<UpdateUserResponse> {
    try {
      const data = await this.updateUserAttrProvider.updateUserAttr(updateAttr);
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async confirmUserAttrUpdate(
    confirmAttr: ConfirmUpdateUserAttrProtocol,
  ): Promise<void> {
    try {
      await this.updateUserAttrProvider.confirmUserAttrUpdate(confirmAttr);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

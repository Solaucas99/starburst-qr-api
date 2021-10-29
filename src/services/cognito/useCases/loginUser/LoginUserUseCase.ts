import { LoginUserProtocol } from '../../../../interfaces/AWSCognito/LoginUserProtocol';
import {
  LoginServiceProviderProtocol,
  LoginResponse,
} from '../../providers/LoginServiceProviderProtocol';

export class LoginUserUseCase {
  constructor(private loginServiceProvider: LoginServiceProviderProtocol) {}

  public async loginUser(user: LoginUserProtocol): Promise<LoginResponse> {
    try {
      const data = await this.loginServiceProvider.loginUser(user);
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

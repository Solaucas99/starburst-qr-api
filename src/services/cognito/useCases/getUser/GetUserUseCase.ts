import {
  GetUserProviderProtocol,
  GetUserResponse,
} from '../../providers/GetUserProviderProtocol';

export class GetUserUseCase {
  constructor(private getUserProvider: GetUserProviderProtocol) {}

  public async getUser(acc_token: string): Promise<GetUserResponse> {
    try {
      const data = await this.getUserProvider.getUser(acc_token);
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

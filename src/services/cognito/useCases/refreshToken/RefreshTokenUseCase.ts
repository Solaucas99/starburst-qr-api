import { RefreshTokenProtocol } from '../../../../interfaces/AWSCognito/RefreshTokenProtocol';
import {
  RefreshTokenProviderProtocol,
  RefreshTokenResponse,
} from '../../providers/RefreshTokenProviderProtocol';

export class RefreshTokenUseCase {
  constructor(private refreshTokenProvider: RefreshTokenProviderProtocol) {}

  public async refreshToken(
    token: RefreshTokenProtocol,
  ): Promise<RefreshTokenResponse> {
    try {
      const data = await this.refreshTokenProvider.refreshToken(token);
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

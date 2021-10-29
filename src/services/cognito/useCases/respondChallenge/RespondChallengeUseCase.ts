import { RespondChallengeProtocol } from '../../../../interfaces/AWSCognito/RespondChallengeProtocol';
import {
  AuthResponse,
  RespondChallengeProviderProtocol,
} from '../../providers/RespondChallengeProviderProtocol';

export class RespondChallengeUseCase {
  constructor(
    private respondChallengeServiceProvider: RespondChallengeProviderProtocol,
  ) {}

  public async respondChallenge(
    attr: RespondChallengeProtocol,
  ): Promise<AuthResponse> {
    try {
      const data = await this.respondChallengeServiceProvider.respondChallenge(
        attr,
      );
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

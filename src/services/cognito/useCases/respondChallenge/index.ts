import { RespondChallengeProviderImplementation } from '../../providers/implementation/RespondChallengeProviderImplementation';
import { RespondChallengeController } from './RespondChallengeController';
import { RespondChallengeUseCase } from './RespondChallengeUseCase';

const provider = new RespondChallengeProviderImplementation();
const useCase = new RespondChallengeUseCase(provider);
const respondChallengeController = new RespondChallengeController(useCase);

export { respondChallengeController };

import { VerifyEmailCodeProviderImplementation } from '../../providers/implementation/VerifyEmailCodeProviderImplementation';
import { VerifyEmailCodeController } from './VerifyEmailCodeController';
import { VerifyEmailCodeUseCase } from './VerifyEmailCodeUseCase';

const provider = new VerifyEmailCodeProviderImplementation();
const useCase = new VerifyEmailCodeUseCase(provider);
const verifyEmailCodeController = new VerifyEmailCodeController(useCase);

export { verifyEmailCodeController };

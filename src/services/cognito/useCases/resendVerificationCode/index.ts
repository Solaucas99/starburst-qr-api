import { ResendVerificationCodeProviderImplementation } from '../../providers/implementation/ResendVerificationCodeCodeProviderImplementation';
import { ResendVerificationCodeController } from './ResendVerificationCodeController';
import { ResendVerificationCodeUseCase } from './ResendVerificationCodeUseCase';

const provider = new ResendVerificationCodeProviderImplementation();
const useCase = new ResendVerificationCodeUseCase(provider);
const resendVerificationCodeController = new ResendVerificationCodeController(
  useCase,
);

export { resendVerificationCodeController };

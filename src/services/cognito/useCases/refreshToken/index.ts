import { RefreshTokenProviderImplementation } from '../../providers/implementation/RefreshTokenProviderImplementation';
import { RefreshTokenController } from './RefreshTokenController';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

const provider = new RefreshTokenProviderImplementation();
const useCase = new RefreshTokenUseCase(provider);
const refreshTokenController = new RefreshTokenController(useCase);

export { refreshTokenController };

import { LoginProviderImplementation } from '../../providers/implementation/LoginProviderImplementation';
import { LoginUserController } from './LoginUserController';
import { LoginUserUseCase } from './LoginUserUseCase';

const provider = new LoginProviderImplementation();
const useCase = new LoginUserUseCase(provider);
const loginController = new LoginUserController(useCase);

export { loginController };

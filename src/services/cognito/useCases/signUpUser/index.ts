import { SignUpProviderImplementation } from '../../providers/implementation/SignUpProviderImplementation';
import { SignUpUserController } from './SignUpUserController';
import { SignUpUserUseCase } from './SignUpUserUseCase';

const provider = new SignUpProviderImplementation();
const signUpUseCase = new SignUpUserUseCase(provider);
const signUpController = new SignUpUserController(signUpUseCase);

export { signUpController, signUpUseCase };

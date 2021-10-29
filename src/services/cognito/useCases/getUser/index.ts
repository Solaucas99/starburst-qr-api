import { GetUserProviderImplementation } from '../../providers/implementation/GetUserProviderImplementation';
import { GetUserController } from './GetUserController';
import { GetUserUseCase } from './GetUserUseCase';

const provider = new GetUserProviderImplementation();
const useCase = new GetUserUseCase(provider);
const getUserController = new GetUserController(useCase);

export { getUserController };

import { UpdateUserAttrImplementation } from '../../providers/implementation/UpdateUserAttrImplementation';
import { UpdateUserAttrController } from './UpdateUserAttrController';
import { UpdateUserAttrUseCase } from './UpdateUserAttrUseCase';

const provider = new UpdateUserAttrImplementation();
const updateUserAttrUseCase = new UpdateUserAttrUseCase(provider);
const updateUserAttrController = new UpdateUserAttrController(
  updateUserAttrUseCase,
);

export { updateUserAttrController, updateUserAttrUseCase };

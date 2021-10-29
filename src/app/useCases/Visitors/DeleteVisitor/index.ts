import { DeleteVisitorController } from './DeleteVisitorController';
import { DeleteVisitorUseCase } from './DeleteVisitorUseCase';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';

const useCase = new DeleteVisitorUseCase(MongoUserRepository);

const deleteVisitorController = new DeleteVisitorController(useCase);

export { deleteVisitorController };

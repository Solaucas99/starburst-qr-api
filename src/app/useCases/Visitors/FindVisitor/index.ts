import { FindVisitorController } from './FindVisitorController';
import { FindVisitorUseCase } from './FindVisitorUseCase';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';

const useCase = new FindVisitorUseCase(MongoUserRepository);

const findVisitorController = new FindVisitorController(useCase);

export { findVisitorController };

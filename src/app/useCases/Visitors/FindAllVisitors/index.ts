import { FindAllVisitorController } from './FindAllVisitorController';
import { FindAllVisitorUseCase } from './FindAllVisitorUseCase';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';

const useCase = new FindAllVisitorUseCase(MongoUserRepository);

const findAllVisitorController = new FindAllVisitorController(useCase);

export { findAllVisitorController };

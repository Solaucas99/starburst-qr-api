import { FindAllVisitorController } from './FindAllVisitorController';
import { FindAllVisitorUseCase } from './FindAllVisitorUseCase';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';
import DecryptDataProvider from '../../../providers/others/cryptojs/implementations/DecryptDataProvider';

const useCase = new FindAllVisitorUseCase(
  MongoUserRepository,
  DecryptDataProvider,
);

const findAllVisitorController = new FindAllVisitorController(useCase);

export { findAllVisitorController };

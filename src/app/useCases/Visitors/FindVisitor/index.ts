import { FindVisitorController } from './FindVisitorController';
import { FindVisitorUseCase } from './FindVisitorUseCase';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';
import DecryptDataProvider from '../../../providers/others/cryptojs/implementations/DecryptDataProvider';

const useCase = new FindVisitorUseCase(
  MongoUserRepository,
  DecryptDataProvider,
);

const findVisitorController = new FindVisitorController(useCase);

export { findVisitorController };

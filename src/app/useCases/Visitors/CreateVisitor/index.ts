import { CreateVisitorController } from './CreateVisitorController';
import { CreateVisitorUseCase } from './CreateVisitorUseCase';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';
import EncryptDataProvider from '../../../providers/others/cryptojs/implementations/EncryptDataProvider';
import ValidationProvider from '../../../providers/validators/implementations/ValidationProvider';
import NodemailerProvider from '../../../providers/mail/implementations/NodemailerProvider';

const useCase = new CreateVisitorUseCase(
  MongoUserRepository,
  NodemailerProvider,
  EncryptDataProvider,
  ValidationProvider,
);

const createVisitorController = new CreateVisitorController(useCase);

export { createVisitorController };

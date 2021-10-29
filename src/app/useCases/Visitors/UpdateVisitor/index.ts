import { UpdateVisitorController } from './UpdateVisitorController';
import { UpdateVisitorUseCase } from './UpdateVisitorUseCase';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';
import EncryptDataProvider from '../../../providers/others/cryptojs/implementations/EncryptDataProvider';
import ValidationProvider from '../../../providers/validators/implementations/ValidationProvider';
import NodemailerProvider from '../../../providers/mail/implementations/NodemailerProvider';

const useCase = new UpdateVisitorUseCase(
  MongoUserRepository,
  NodemailerProvider,
  EncryptDataProvider,
  ValidationProvider,
);

const updateVisitorController = new UpdateVisitorController(useCase);

export { updateVisitorController };

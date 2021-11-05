import { CreateVisitorController } from './CreateVisitorController';
import { CreateVisitorUseCase } from './CreateVisitorUseCase';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';
import EncryptDataProvider from '../../../providers/others/cryptojs/implementations/EncryptDataProvider';
import ValidationProvider from '../../../providers/validators/implementations/ValidationProvider';
import BullQueueProvider from '../../../providers/queue/implementations/BullQueueProvider';

const useCase = new CreateVisitorUseCase(
  MongoUserRepository,
  BullQueueProvider,
  EncryptDataProvider,
  ValidationProvider,
);

const createVisitorController = new CreateVisitorController(useCase);

export { createVisitorController };

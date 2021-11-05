import { CreateUpdateVisitorLinkController } from './CreateUpdateVisitorLinkController';
import { CreateUpdateVisitorLinkUseCase } from './CreateUpdateVisitorLinkUseCase';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';
import EncryptDataProvider from '../../../providers/others/cryptojs/implementations/EncryptDataProvider';
import ValidationProvider from '../../../providers/validators/implementations/ValidationProvider';
import BullQueueProvider from '../../../providers/queue/implementations/BullQueueProvider';
import MongoCreationUpdateLinkRepository from '../../../repositories/visitors/updateVisitorLink/implementations/MongoCreationUpdateLinkRepository';

const useCase = new CreateUpdateVisitorLinkUseCase(
  MongoCreationUpdateLinkRepository,
  MongoUserRepository,
  BullQueueProvider,
  EncryptDataProvider,
  ValidationProvider,
);

const createUpdateVisitorLinkController = new CreateUpdateVisitorLinkController(
  useCase,
);

export { createUpdateVisitorLinkController };

import { CreateVisitorLinkController } from './CreateVisitorLinkController';
import { CreateVisitorLinkUseCase } from './CreateVisitorLinkUseCase';
import MongoCreationLinkRepository from '../../../repositories/visitors/createVisitorLink/implementations/MongoCreationLinkRepository';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';
import EncryptDataProvider from '../../../providers/others/cryptojs/implementations/EncryptDataProvider';
import ValidationProvider from '../../../providers/validators/implementations/ValidationProvider';
import BullQueueProvider from '../../../providers/queue/implementations/BullQueueProvider';

const useCase = new CreateVisitorLinkUseCase(
  MongoCreationLinkRepository,
  MongoUserRepository,
  BullQueueProvider,
  EncryptDataProvider,
  ValidationProvider,
);

const createVisitorLinkController = new CreateVisitorLinkController(useCase);

export { createVisitorLinkController };

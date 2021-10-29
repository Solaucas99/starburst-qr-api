import { CreateUpdateVisitorLinkController } from './CreateUpdateVisitorLinkController';
import { CreateUpdateVisitorLinkUseCase } from './CreateUpdateVisitorLinkUseCase';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';
import EncryptDataProvider from '../../../providers/others/cryptojs/implementations/EncryptDataProvider';
import ValidationProvider from '../../../providers/validators/implementations/ValidationProvider';
import NodemailerProvider from '../../../providers/mail/implementations/NodemailerProvider';
import MongoCreationUpdateLinkRepository from '../../../repositories/visitors/updateVisitorLink/implementations/MongoCreationUpdateLinkRepository';

const useCase = new CreateUpdateVisitorLinkUseCase(
  MongoCreationUpdateLinkRepository,
  MongoUserRepository,
  NodemailerProvider,
  EncryptDataProvider,
  ValidationProvider,
);

const createUpdateVisitorLinkController = new CreateUpdateVisitorLinkController(
  useCase,
);

export { createUpdateVisitorLinkController };

import { CreateVisitorLinkController } from './CreateVisitorLinkController';
import { CreateVisitorLinkUseCase } from './CreateVisitorLinkUseCase';
import MongoCreationLinkRepository from '../../../repositories/visitors/createVisitorLink/implementations/MongoCreationLinkRepository';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';
import EncryptDataProvider from '../../../providers/others/cryptojs/implementations/EncryptDataProvider';
import ValidationProvider from '../../../providers/validators/implementations/ValidationProvider';
import NodemailerProvider from '../../../providers/mail/implementations/NodemailerProvider';

const useCase = new CreateVisitorLinkUseCase(
  MongoCreationLinkRepository,
  MongoUserRepository,
  NodemailerProvider,
  EncryptDataProvider,
  ValidationProvider,
);

const createVisitorLinkController = new CreateVisitorLinkController(useCase);

export { createVisitorLinkController };

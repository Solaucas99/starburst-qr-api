import { ConfirmVisitorMailController } from './ConfirmVisitorMailController';
import { ConfirmVisitorMailUseCase } from './ConfirmVisitorMailUseCase';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';
import MongoCreationLinkRepository from '../../../repositories/visitors/createVisitorLink/implementations/MongoCreationLinkRepository';

const useCase = new ConfirmVisitorMailUseCase(
  MongoUserRepository,
  MongoCreationLinkRepository,
);

const confirmVisitorMailController = new ConfirmVisitorMailController(useCase);

export { confirmVisitorMailController };

import { ConfirmUpdateVisitorMailController } from './ConfirmUpdateVisitorMailController';
import { ConfirmUpdateVisitorMailUseCase } from './ConfirmUpdateVisitorMailUseCase';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';
import MongoCreationUpdateLinkRepository from '../../../repositories/visitors/updateVisitorLink/implementations/MongoCreationUpdateLinkRepository';

const useCase = new ConfirmUpdateVisitorMailUseCase(
  MongoUserRepository,
  MongoCreationUpdateLinkRepository,
);

const confirmUpdateVisitorMailController =
  new ConfirmUpdateVisitorMailController(useCase);

export { confirmUpdateVisitorMailController };

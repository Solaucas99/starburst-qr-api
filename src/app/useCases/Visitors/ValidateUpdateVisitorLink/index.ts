import { ValidateUpdateVisitorLinkController } from './ValidateUpdateVisitorLinkController';
import { ValidateUpdateVisitorLinkUseCase } from './ValidateUpdateVisitorLinkUseCase';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';
import MongoCreationUpdateLinkRepository from '../../../repositories/visitors/updateVisitorLink/implementations/MongoCreationUpdateLinkRepository';

const useCase = new ValidateUpdateVisitorLinkUseCase(
  MongoCreationUpdateLinkRepository,
  MongoUserRepository,
);

const validateUpdateVisitorLinkController =
  new ValidateUpdateVisitorLinkController(useCase);

export { validateUpdateVisitorLinkController };

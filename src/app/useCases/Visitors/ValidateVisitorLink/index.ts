import { ValidateVisitorLinkController } from './ValidateVisitorLinkController';
import { ValidateVisitorLinkUseCase } from './ValidateVisitorLinkUseCase';
import MongoCreationLinkRepository from '../../../repositories/visitors/createVisitorLink/implementations/MongoCreationLinkRepository';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';

const useCase = new ValidateVisitorLinkUseCase(
  MongoCreationLinkRepository,
  MongoUserRepository,
);

const validateVisitorLinkController = new ValidateVisitorLinkController(
  useCase,
);

export { validateVisitorLinkController };

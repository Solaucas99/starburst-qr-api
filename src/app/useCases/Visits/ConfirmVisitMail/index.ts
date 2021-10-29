import { ConfirmVisitMailController } from './ConfirmVisitMailController';
import { ConfirmVisitMailUseCase } from './ConfirmVisitMailUseCase';
import MongoVisitRepository from '../../../repositories/visits/implementations/MongoVisitRepository';

const useCase = new ConfirmVisitMailUseCase(MongoVisitRepository);

const confirmVisitMailController = new ConfirmVisitMailController(useCase);

export { confirmVisitMailController };

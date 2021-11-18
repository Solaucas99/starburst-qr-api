import { ConfirmVisitMailController } from './ConfirmVisitMailController';
import { ConfirmVisitMailUseCase } from './ConfirmVisitMailUseCase';
import MongoVisitRepository from '../../../repositories/visits/implementations/MongoVisitRepository';
import DecryptDataProvider from '../../../providers/others/cryptojs/implementations/DecryptDataProvider';

const useCase = new ConfirmVisitMailUseCase(
  MongoVisitRepository,
  DecryptDataProvider,
);

const confirmVisitMailController = new ConfirmVisitMailController(useCase);

export { confirmVisitMailController };

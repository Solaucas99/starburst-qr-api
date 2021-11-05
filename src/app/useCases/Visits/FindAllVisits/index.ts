import { FindAllVisitsController } from './FindAllVisitsController';
import { FindAllVisitsUseCase } from './FindAllVisitsUseCase';
import MongoVisitRepository from '../../../repositories/visits/implementations/MongoVisitRepository';
import DecryptDataProvider from '../../../providers/others/cryptojs/implementations/DecryptDataProvider';

const useCase = new FindAllVisitsUseCase(
  MongoVisitRepository,
  DecryptDataProvider,
);

const findAllVisitsController = new FindAllVisitsController(useCase);

export { findAllVisitsController };

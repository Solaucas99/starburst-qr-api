import { FindVisitController } from './FindVisitsController';
import { FindVisitsUseCase } from './FindVisitsUseCase';
import MongoVisitRepository from '../../../repositories/visits/implementations/MongoVisitRepository';

const useCase = new FindVisitsUseCase(MongoVisitRepository);

const findVisitController = new FindVisitController(useCase);

export { findVisitController };

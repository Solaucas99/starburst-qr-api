import { FindAllVisitsController } from './FindAllVisitsController';
import { FindAllVisitsUseCase } from './FindAllVisitsUseCase';
import MongoVisitRepository from '../../../repositories/visits/implementations/MongoVisitRepository';

const useCase = new FindAllVisitsUseCase(MongoVisitRepository);

const findAllVisitsController = new FindAllVisitsController(useCase);

export { findAllVisitsController };

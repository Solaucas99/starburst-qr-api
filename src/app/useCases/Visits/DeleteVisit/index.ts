import { DeleteVisitController } from './DeleteVisitController';
import { DeleteVisitUseCase } from './DeleteVisitUseCase';
import MongoVisitRepository from '../../../repositories/visits/implementations/MongoVisitRepository';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';
import DecryptDataProvider from '../../../providers/others/cryptojs/implementations/DecryptDataProvider';
import BullQueueProvider from '../../../providers/queue/implementations/BullQueueProvider';

const useCase = new DeleteVisitUseCase(
  MongoVisitRepository,
  MongoUserRepository,
  DecryptDataProvider,
  BullQueueProvider,
);

const deleteVisitController = new DeleteVisitController(useCase);

export { deleteVisitController };

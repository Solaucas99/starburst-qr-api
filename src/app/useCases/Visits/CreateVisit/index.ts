import { CreateVisitController } from './CreateVisitController';
import { CreateVisitUseCase } from './CreateVisitUseCase';
import MongoUserRepository from '../../../repositories/visitors/implementations/MongoUserRepository';
import MongoVisitRepository from '../../../repositories/visits/implementations/MongoVisitRepository';
import DecryptDataProvider from '../../../providers/others/cryptojs/implementations/DecryptDataProvider';
import EncryptDataProvider from '../../../providers/others/cryptojs/implementations/EncryptDataProvider';
import NodemailerProvider from '../../../providers/mail/implementations/NodemailerProvider';
import GenerateQRCodeImplementation from '../../../providers/generators/qrcode/implementations/GenerateQRCodeImplementation';

const useCase = new CreateVisitUseCase(
  MongoVisitRepository,
  MongoUserRepository,
  NodemailerProvider,
  DecryptDataProvider,
  EncryptDataProvider,
  GenerateQRCodeImplementation,
);

const createVisitController = new CreateVisitController(useCase);

export { createVisitController };

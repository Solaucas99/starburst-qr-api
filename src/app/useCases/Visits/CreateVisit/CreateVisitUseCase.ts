import generateVisitMail from '../../../../templates/VisitMail';
import { IVisit } from '../../../entities/IVisit';
import { IVisitsRepository } from '../../../repositories/visits/IVisitsRepository';
import { IVisitorsRepository } from '../../../repositories/visitors/IVisitorsRepository';
import { IError } from '../../../../interfaces/IError';
import { IQRCodeGenerator } from '../../../providers/generators/qrcode/IQRCodeGenerator';
import { IDecryptDataProvider } from '../../../providers/others/cryptojs/IDecryptDataProvider';
import { IEncryptDataProvider } from '../../../providers/others/cryptojs/IEncryptDataProvider';
import { IMailQueueProvider } from '../../../providers/queue/IMailQueueProvider';

export class CreateVisitUseCase {
  private _errors: IError[] = [];

  constructor(
    private visitsRepository: IVisitsRepository,
    private visitorsRepository: IVisitorsRepository,
    private mailQueueProvider: IMailQueueProvider,
    private decryptDataProvider: IDecryptDataProvider,
    private encryptDataProvider: IEncryptDataProvider,
    private qrcodeGenerator: IQRCodeGenerator,
  ) {}

  public get errors(): IError[] {
    return this._errors;
  }

  public set errors(value: IError[]) {
    this._errors = value;
  }

  public async execute(visitAttr: IVisit): Promise<IVisit | void> {
    try {
      const { date, visitor } = visitAttr;

      if (date.getTime() < Date.now()) {
        this._errors.push({
          errStatus: 400,
          errMessage: 'Data inválida.',
        });
        return;
      }

      const visitorExists = await this.visitorsRepository.findVisitorById(
        visitor as string,
      );

      if (!visitorExists) {
        this._errors.push({
          errStatus: 400,
          errMessage: 'Visitante não existe.',
        });
        return;
      }

      if (!visitorExists.confirmed_email) {
        this._errors.push({
          errStatus: 401,
          errMessage:
            'O visitante precisa confirmar o e-mail antes de ser vinculado a uma visita',
        });
        return;
      }

      const visit = await this.visitsRepository.createVisit({
        date,
        visitor: visitorExists._id as string,
      });

      if (!visit) throw new Error('Unexpected Error');

      const jsonString = JSON.stringify({
        cpf: visitorExists.cpf as string,
        visitId: visit?._id as string,
      });

      const encryptJsonString = this.encryptDataProvider.executeAES(jsonString);

      const urlQrCode = this.qrcodeGenerator.generate(
        encryptJsonString,
        visit?._id as string,
      );

      visit.qrcode = urlQrCode;

      await visit.save();

      const destinatary = {
        name: visitorExists.nome,
        email: this.decryptDataProvider.executeAES(visitorExists.email),
      };

      await this.mailQueueProvider.ToMailQueue(
        generateVisitMail(destinatary.email, destinatary.name, visit),
        'ConfirmedVisitMail',
      );

      return visit;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

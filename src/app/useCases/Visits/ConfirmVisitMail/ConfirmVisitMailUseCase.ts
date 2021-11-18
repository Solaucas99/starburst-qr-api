import fs from 'fs';
import { IVisitsRepository } from '../../../repositories/visits/IVisitsRepository';
import { IError } from '../../../../interfaces/IError';
import { IVisit } from '../../../entities/IVisit';
import { IDecryptDataProvider } from '../../../providers/others/cryptojs/IDecryptDataProvider';

export class ConfirmVisitMailUseCase {
  private _errors: IError[] = [];

  constructor(
    private visitsRepository: IVisitsRepository,
    private decryptDataProvider: IDecryptDataProvider,
  ) {}

  public get errors(): IError[] {
    return this._errors;
  }

  public set errors(value: IError[]) {
    this._errors = value;
  }

  public async execute(data: string): Promise<IVisit | void> {
    try {
      const decryptedData = this.decryptDataProvider.executeAES(data);

      const objData: { cpf: string; visitId: string } =
        JSON.parse(decryptedData);

      const visit = await this.visitsRepository.findVisitById(objData.visitId);

      if (!visit) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Visita não encontrada.',
        });
        return;
      }

      if (visit.finished) {
        this._errors.push({
          errStatus: 401,
          errMessage: 'Essa visita já foi concluída. Não autorizado!',
        });
        return;
      }

      visit.finished = true;
      visit.qrcode = '';
      await visit.save();

      fs.rmSync(`./public/qrcodes/${visit._id}`, {
        force: true,
        recursive: true,
      });

      const decryptedVisit = visit.toObject();

      if (
        typeof decryptedVisit.visitor === 'string' ||
        !decryptedVisit.visitor
      ) {
        this._errors.push({
          errStatus: 400,
          errMessage: 'Erro inesperado!',
        });
        return;
      }

      delete decryptedVisit.visitor?.bic;
      delete decryptedVisit.visitor?.bie;

      decryptedVisit.visitor.email = this.decryptDataProvider.executeAES(
        decryptedVisit.visitor.email,
      );

      decryptedVisit.visitor.cpf = this.decryptDataProvider.executeAES(
        decryptedVisit.visitor.cpf,
      );

      return decryptedVisit;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

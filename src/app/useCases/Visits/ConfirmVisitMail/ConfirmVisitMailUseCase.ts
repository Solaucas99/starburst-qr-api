import fs from 'fs';
import { IVisitsRepository } from '../../../repositories/visits/IVisitsRepository';
import { IError } from '../../../../interfaces/IError';
import { IVisit } from '../../../entities/IVisit';

export class ConfirmVisitMailUseCase {
  private _errors: IError[] = [];

  constructor(private visitsRepository: IVisitsRepository) {}

  public get errors(): IError[] {
    return this._errors;
  }

  public set errors(value: IError[]) {
    this._errors = value;
  }

  public async execute(id: string): Promise<IVisit | void> {
    try {
      const visit = await this.visitsRepository.findVisitById(id);
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

      return visit;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

import { IVisitsRepository } from '../../../repositories/visits/IVisitsRepository';
import { IError } from '../../../../interfaces/IError';
import { IVisit } from '../../../entities/IVisit';

export class FindVisitsUseCase {
  private _errors: IError[] = [];

  constructor(private visitsRepository: IVisitsRepository) {}

  public get errors(): IError[] {
    return this._errors;
  }

  public set errors(value: IError[]) {
    this._errors = value;
  }

  public async executeById(id: string): Promise<IVisit | void> {
    try {
      const visit = await this.visitsRepository.findVisitById(id);

      if (!visit) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Página não encontrada.',
        });
        return;
      }

      return visit;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async executeByAttribute(
    attributes: Partial<Omit<IVisit, '_id'>>,
  ): Promise<IVisit | IVisit[] | void> {
    try {
      if (!attributes.date && !attributes.finished && !attributes.visitor) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Página não encontrada.',
        });
        return;
      }

      const visits = await this.visitsRepository.findVisitsByAttribute(
        attributes,
      );

      if (!visits || (Array.isArray(visits) && visits.length === 0)) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Visita(s) não encontrada(s).',
        });
        return;
      }

      return visits;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

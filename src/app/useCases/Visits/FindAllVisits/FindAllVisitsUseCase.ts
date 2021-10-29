import { IVisitsRepository } from '../../../repositories/visits/IVisitsRepository';
import { IError } from '../../../../interfaces/IError';
import { IVisit } from '../../../entities/IVisit';

export class FindAllVisitsUseCase {
  private _errors: IError[] = [];

  constructor(private visitsRepository: IVisitsRepository) {}

  public get errors(): IError[] {
    return this._errors;
  }

  public set errors(value: IError[]) {
    this._errors = value;
  }

  public async execute(): Promise<IVisit[] | void> {
    try {
      const visits = await this.visitsRepository.findAllVisits();

      if (!visits || visits.length === 0) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Visitas não encontradas.',
        });
        return;
      }

      return visits;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

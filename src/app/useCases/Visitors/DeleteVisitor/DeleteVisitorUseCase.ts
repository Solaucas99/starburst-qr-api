import { IVisitorsRepository } from '../../../repositories/visitors/IVisitorsRepository';
import { IError } from '../../../../interfaces/IError';

export class DeleteVisitorUseCase {
  private _errors: IError[] = [];

  constructor(private visitorsRepository: IVisitorsRepository) {}

  public get errors(): IError[] {
    return this._errors;
  }

  public set errors(value: IError[]) {
    this._errors = value;
  }

  public async execute(id: string): Promise<void> {
    try {
      const visitor = await this.visitorsRepository.deleteVisitorById(id);

      if (!visitor) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Visitante não encontrado.',
        });
        return;
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

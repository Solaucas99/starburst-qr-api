import { IVisitorsRepository } from '../../../repositories/visitors/IVisitorsRepository';
import { IError } from '../../../../interfaces/IError';
import { IVisitor } from '../../../entities/IVisitor';

export class FindAllVisitorUseCase {
  private _errors: IError[] = [];

  constructor(private visitorsRepository: IVisitorsRepository) {}

  public get errors(): IError[] {
    return this._errors;
  }

  public set errors(value: IError[]) {
    this._errors = value;
  }

  public async execute(): Promise<IVisitor[] | void> {
    try {
      const visitors = await this.visitorsRepository.findAllVisitors();

      if (!visitors || visitors.length === 0) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Visitantes não encontrados.',
        });
        return;
      }

      return visitors;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

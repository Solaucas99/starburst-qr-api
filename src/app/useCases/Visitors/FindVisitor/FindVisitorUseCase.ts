import { IVisitorsRepository } from '../../../repositories/visitors/IVisitorsRepository';
import { IError } from '../../../../interfaces/IError';
import { IVisitor } from '../../../entities/IVisitor';

export class FindVisitorUseCase {
  private _errors: IError[] = [];

  constructor(private visitorsRepository: IVisitorsRepository) {}

  public get errors(): IError[] {
    return this._errors;
  }

  public set errors(value: IError[]) {
    this._errors = value;
  }

  public async executeById(id: string): Promise<IVisitor | void> {
    try {
      const visitor = await this.visitorsRepository.findVisitorById(id);

      if (!visitor) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Página não encontrada.',
        });
        return;
      }

      return visitor;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async executeByAttribute(
    attributes: Partial<Omit<IVisitor, '_id'>>,
  ): Promise<IVisitor | void> {
    try {
      if (!attributes.nome && !attributes.bie) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Página não encontrada.',
        });
        return;
      }

      const visitor = await this.visitorsRepository.findVisitorByAttribute(
        attributes,
      );

      if (!visitor || (Array.isArray(visitor) && visitor.length === 0)) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Visitante(s) não encontrado(s).',
        });
        return;
      }

      return visitor;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

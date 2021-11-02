import { IVisitorsRepository } from '../../../repositories/visitors/IVisitorsRepository';
import { IError } from '../../../../interfaces/IError';
import { IVisitor } from '../../../entities/IVisitor';
import { IDecryptDataProvider } from '../../../providers/others/cryptojs/IDecryptDataProvider';

export class FindVisitorUseCase {
  private _errors: IError[] = [];

  constructor(
    private visitorsRepository: IVisitorsRepository,
    private decryptDataProvider: IDecryptDataProvider,
  ) {}

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

      visitor.email = this.decryptDataProvider.executeAES(visitor.email);
      visitor.cpf = this.decryptDataProvider.executeAES(visitor.cpf);
      delete visitor.bic;
      delete visitor.bie;

      return visitor;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async executeByAttribute(attributes: {
    bie: string;
  }): Promise<IVisitor | void> {
    try {
      if (!attributes.bie) {
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

      visitor.email = this.decryptDataProvider.executeAES(visitor.email);
      visitor.cpf = this.decryptDataProvider.executeAES(visitor.cpf);
      delete visitor.bic;
      delete visitor.bie;

      return visitor;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

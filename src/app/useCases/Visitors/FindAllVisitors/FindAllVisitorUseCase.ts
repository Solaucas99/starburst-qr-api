import { IVisitorsRepository } from '../../../repositories/visitors/IVisitorsRepository';
import { IError } from '../../../../interfaces/IError';
import { IVisitor } from '../../../entities/IVisitor';
import { IDecryptDataProvider } from '../../../providers/others/cryptojs/IDecryptDataProvider';

export class FindAllVisitorUseCase {
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

      const decryptedVisitors = visitors.map((visitor) => {
        const visitorObj = visitor;
        visitorObj.cpf = this.decryptDataProvider.executeAES(visitor.cpf);
        visitorObj.email = this.decryptDataProvider.executeAES(visitor.email);
        delete visitorObj.bic;
        delete visitorObj.bie;
        return visitorObj;
      });

      return decryptedVisitors;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

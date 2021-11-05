import { IVisitsRepository } from '../../../repositories/visits/IVisitsRepository';
import { IError } from '../../../../interfaces/IError';
import { IVisit } from '../../../entities/IVisit';
import { IDecryptDataProvider } from '../../../providers/others/cryptojs/IDecryptDataProvider';

export class FindAllVisitsUseCase {
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

      const decryptedVisits = visits.map((visit) => {
        const visitObj = { ...visit };
        const { visitor } = visitObj;

        if (typeof visitor === 'string' || !visitor) return visitObj;

        delete visitor.bic;
        delete visitor.bie;

        // Propriedade atribuída com um novo objeto por conta da referencia
        visitObj.visitor = {
          ...visitor,
          email: this.decryptDataProvider.executeAES(visitor.email),
        };

        return visitObj;
      });

      return decryptedVisits;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

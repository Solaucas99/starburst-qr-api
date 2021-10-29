import { ICreateVisitorLinkRepository } from '../../../repositories/visitors/createVisitorLink/ICreateVisitorLinkRepository';
import { IError } from '../../../../interfaces/IError';
import { isValidObjectId } from 'mongoose';
import { IVisitorsRepository } from '../../../repositories/visitors/IVisitorsRepository';

export class ValidateVisitorLinkUseCase {
  private _errors: IError[] = [];

  constructor(
    private visitorLinkRepository: ICreateVisitorLinkRepository,
    private visitorsRepository: IVisitorsRepository,
  ) {}

  public get errors(): IError[] {
    return this._errors;
  }

  public set errors(value: IError[]) {
    this._errors = value;
  }

  public async execute(
    token: string,
    id: string,
    visitorBie: string,
  ): Promise<void | boolean> {
    try {
      if (token.length !== 25) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Página não encontrada.',
        });
        return;
      }
      if (!isValidObjectId(id)) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Página não encontrada.',
        });
        return;
      }
      const createdVisitorLink =
        await this.visitorLinkRepository.findVisitorLinkById(id);

      if (!createdVisitorLink) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Página não encontrada.',
        });
        return;
      }

      if (!createdVisitorLink._id) throw new Error('Unexpected error');

      if (createdVisitorLink.token !== token) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Página não encontrada.',
        });
        return;
      }

      if (createdVisitorLink.bie !== visitorBie) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Página não encontrada.',
        });
        return;
      }

      const visitorAlreadyExists =
        await this.visitorsRepository.findVisitorByAttribute({
          bie: visitorBie,
        });

      if (visitorAlreadyExists && visitorAlreadyExists.confirmed_email) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Página não encontrada.',
        });
        return;
      }

      if (visitorAlreadyExists && !visitorAlreadyExists.confirmed_email) {
        return true;
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

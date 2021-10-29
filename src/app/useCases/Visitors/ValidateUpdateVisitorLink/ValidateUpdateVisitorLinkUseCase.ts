import { ICreateUpdateVisitorLinkRepository } from '../../../repositories/visitors/updateVisitorLink/ICreateUpdateVisitorLinkRepository';
import { IError } from '../../../../interfaces/IError';
import { isValidObjectId } from 'mongoose';
import { IVisitorsRepository } from '../../../repositories/visitors/IVisitorsRepository';

export class ValidateUpdateVisitorLinkUseCase {
  private _errors: IError[] = [];

  constructor(
    private updateVisitorLinkRepository: ICreateUpdateVisitorLinkRepository,
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
    updateLinkId: string,
    visitorId: string,
  ): Promise<void | boolean> {
    try {
      if (token.length !== 25) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Página não encontrada.',
        });
        return;
      }

      if (!isValidObjectId(visitorId) || !isValidObjectId(updateLinkId)) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Página não encontrada.',
        });
        return;
      }

      const createdUpdatedVisitorLink =
        await this.updateVisitorLinkRepository.findUpdateVisitorLinkById(
          updateLinkId,
        );

      if (!createdUpdatedVisitorLink) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Página não encontrada.',
        });
        return;
      }

      if (!createdUpdatedVisitorLink._id) throw new Error('Unexpected error');

      if (createdUpdatedVisitorLink.token !== token) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Página não encontrada.',
        });
        return;
      }

      if (
        createdUpdatedVisitorLink.visitor.toString() !== visitorId.toString()
      ) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Página não encontrada.',
        });
        return;
      }

      const visitorAlreadyExists =
        await this.visitorsRepository.findVisitorById(visitorId);

      if (!visitorAlreadyExists) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Página não encontrada.',
        });
        return;
      }

      if (
        !visitorAlreadyExists.confirmed_email &&
        createdUpdatedVisitorLink.visitor.toString() ===
          visitorAlreadyExists._id?.toString()
      ) {
        return true;
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

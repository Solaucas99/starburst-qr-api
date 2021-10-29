import { IVisitorsRepository } from '../../../repositories/visitors/IVisitorsRepository';
import { IError } from '../../../../interfaces/IError';
import { IVisitor } from '../../../entities/IVisitor';
import { ICreateVisitorLinkRepository } from '../../../repositories/visitors/createVisitorLink/ICreateVisitorLinkRepository';

export class ConfirmVisitorMailUseCase {
  private _errors: IError[] = [];

  constructor(
    private visitorsRepository: IVisitorsRepository,
    private visitorLinkRepository: ICreateVisitorLinkRepository,
  ) {}

  public get errors(): IError[] {
    return this._errors;
  }

  public set errors(value: IError[]) {
    this._errors = value;
  }

  public async execute(
    id: string,
    generated_pass: string,
    visitorLinkId: string,
  ): Promise<IVisitor | void> {
    try {
      if (typeof generated_pass !== 'string' || generated_pass.length === 0) {
        this._errors.push({
          errStatus: 400,
          errMessage: 'Senha temporária não enviada.',
        });
        return;
      }

      const visitor = await this.visitorsRepository.findVisitorById(id);

      if (!visitor) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Visitante não encontrado.',
        });
        return;
      }

      if (visitor.confirmed_email === true) {
        this._errors.push({
          errStatus: 400,
          errMessage: 'O e-mail do visitante já foi confirmado.',
        });
        return;
      }

      if (generated_pass !== visitor.generated_pass) {
        this._errors.push({
          errStatus: 401,
          errMessage: 'Senha temporária inválida.',
        });
        return;
      }

      const updatedVisitor = await this.visitorsRepository.updateVisitorById(
        id,
        {
          confirmed_email: true,
          generated_pass: undefined,
        },
      );

      if (!updatedVisitor) throw new Error('Unexpected error');

      const clearVisitorLink =
        await this.visitorLinkRepository.deleteVisitorLinkById(visitorLinkId);

      if (!clearVisitorLink) {
        this._errors.push({
          errStatus: 400,
          errMessage: 'Ocorreu um erro! Tente novamente mais tarde.',
        });
        return;
      }

      return updatedVisitor;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

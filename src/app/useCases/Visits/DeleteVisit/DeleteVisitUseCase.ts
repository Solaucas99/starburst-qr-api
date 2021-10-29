import { IVisitsRepository } from '../../../repositories/visits/IVisitsRepository';
import { IError } from '../../../../interfaces/IError';
import { IDecryptDataProvider } from '../../../providers/others/cryptojs/IDecryptDataProvider';
import { IVisitorsRepository } from '../../../repositories/visitors/IVisitorsRepository';
import { IMailProvider } from '../../../providers/mail/IMailProvider';
import cancelVisitMail from '../../../../templates/CancelVisitMail';

export class DeleteVisitUseCase {
  private _errors: IError[] = [];

  constructor(
    private visitsRepository: IVisitsRepository,
    private visitorsRepository: IVisitorsRepository,
    private decryptDataProvider: IDecryptDataProvider,
    private mailProvider: IMailProvider,
  ) {}

  public get errors(): IError[] {
    return this._errors;
  }

  public set errors(value: IError[]) {
    this._errors = value;
  }

  public async execute(id: string): Promise<void> {
    try {
      const visit = await this.visitsRepository.findVisitById(id);

      if (!visit) {
        this._errors.push({
          errStatus: 404,
          errMessage: 'Página não encontrada.',
        });
        return;
      }

      if (visit.finished) {
        this._errors.push({
          errStatus: 401,
          errMessage: 'A visita já foi finalizada e não pode ser cancelada.',
        });
        return;
      }

      if (!visit._id) throw new Error('Unexpected error');

      await this.visitsRepository.deleteVisitById(id);

      const visitor = await this.visitorsRepository.findVisitorById(
        visit.visitor,
      );

      if (!visitor) {
        this._errors.push({
          errStatus: 400,
          errMessage:
            'Ocorreu um erro ao enviar o e-mail de cancelamento da visita para o visitante, mas de qualquer forma a visita foi cancelada. Avise o visitante por outros meios.',
        });
        return;
      }

      if (!visitor.email) throw new Error('Unexpected Error');

      const decryptedMail = this.decryptDataProvider.executeAES(visitor.email);

      const mail = await this.mailProvider.sendMail(
        cancelVisitMail(decryptedMail, visitor.nome, visit),
      );

      if (mail.rejected.length > 0) {
        this._errors.push({
          errStatus: 400,
          errMessage: 'Um erro ocorreu ao enviar o e-mail, tente novamente.',
        });
        return;
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

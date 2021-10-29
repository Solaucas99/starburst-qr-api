import createLinkToken from '../../../../services/utils/createLinkToken';
// import VisitorLinkMail from '../../../../templates/VisitorLinkMail';
// import { IVisitorLinkGen } from '../../../entities/IVisitorLinkGen';
import { IMailProvider } from '../../../providers/mail/IMailProvider';
import { IEncryptDataProvider } from '../../../providers/others/cryptojs/IEncryptDataProvider';
import { IValidationProvider } from '../../../providers/validators/IValidationProvider';
import { IError } from '../../../../interfaces/IError';
import { IVisitorsRepository } from '../../../repositories/visitors/IVisitorsRepository';
import { ICreateUpdateVisitorLinkRepository } from '../../../repositories/visitors/updateVisitorLink/ICreateUpdateVisitorLinkRepository';
import { IUpdateVisitorLinkGen } from '../../../entities/IUpdateVisitorLinkGen';
import UpdateVisitorLinkMail from '../../../../templates/UpdateVisitorLinkMail';

export class CreateUpdateVisitorLinkUseCase {
  private _errors: IError[] = [];

  constructor(
    private updateVisitorLinkRepository: ICreateUpdateVisitorLinkRepository,
    private visitorsRepository: IVisitorsRepository,
    private mailProvider: IMailProvider,
    private encryptDataProvider: IEncryptDataProvider,
    private validationProvider: IValidationProvider,
  ) {}

  public get errors(): IError[] {
    return this._errors;
  }

  public set errors(value: IError[]) {
    this._errors = value;
  }

  public async execute(email: string): Promise<IUpdateVisitorLinkGen | void> {
    try {
      if (!this.validationProvider.validateEmail(email)) {
        this._errors.push({ errStatus: 400, errMessage: 'E-mail inválido.' });
        return;
      }

      const mailHmacEncrypted = this.encryptDataProvider.executeHmac(email);

      const visitorMailExists =
        await this.visitorsRepository.findVisitorByAttribute({
          bie: mailHmacEncrypted,
        });

      if (!visitorMailExists) {
        this._errors.push({
          errStatus: 400,
          errMessage:
            'O e-mail inserido não está cadastrado na lista de visitantes.',
        });
        return;
      }

      if (!visitorMailExists._id) throw new Error('Unexpected Error');

      const visitorMailLinkExists =
        await this.updateVisitorLinkRepository.findUpdateVisitorLinkByAttribute(
          visitorMailExists?._id,
        );

      if (visitorMailLinkExists) {
        this._errors.push({
          errStatus: 400,
          errMessage:
            'O e-mail inserido do visitante já recebeu um link de atualização. Aguarde até expirar o link (4 dias) para enviar um novo ou solicite para que o visitante utilize o link para fazer a atualização dos dados.',
        });
        return;
      }

      const token = createLinkToken();

      const updateVisitorLink =
        await this.updateVisitorLinkRepository.createUpdateVisitorLink({
          token,
          visitor: visitorMailExists._id,
        });

      if (!updateVisitorLink || !updateVisitorLink._id)
        throw new Error('Unexpected error');

      const sendMail = await this.mailProvider.sendMail(
        UpdateVisitorLinkMail(
          email,
          visitorMailExists._id,
          token,
          updateVisitorLink._id,
        ),
      );

      if (sendMail.rejected.length > 0) {
        this._errors.push({
          errStatus: 400,
          errMessage: 'Um erro ocorreu ao enviar o e-mail, tente novamente.',
        });
        return;
      }

      return updateVisitorLink;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

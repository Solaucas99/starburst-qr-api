import path from 'path';
import fs from 'fs';
import JWT from 'jsonwebtoken';

import createLinkToken from '../../../../services/utils/createLinkToken';
// import VisitorLinkMail from '../../../../templates/VisitorLinkMail';
// import { IVisitorLinkGen } from '../../../entities/IVisitorLinkGen';
import { IEncryptDataProvider } from '../../../providers/others/cryptojs/IEncryptDataProvider';
import { IValidationProvider } from '../../../providers/validators/IValidationProvider';
import { IError } from '../../../../interfaces/IError';
import { IVisitorsRepository } from '../../../repositories/visitors/IVisitorsRepository';
import { ICreateUpdateVisitorLinkRepository } from '../../../repositories/visitors/updateVisitorLink/ICreateUpdateVisitorLinkRepository';
import { IUpdateVisitorLinkGen } from '../../../entities/IUpdateVisitorLinkGen';
import UpdateVisitorLinkMail from '../../../../templates/UpdateVisitorLinkMail';
import { IMailQueueProvider } from '../../../providers/queue/IMailQueueProvider';

export class CreateUpdateVisitorLinkUseCase {
  private _errors: IError[] = [];

  constructor(
    private updateVisitorLinkRepository: ICreateUpdateVisitorLinkRepository,
    private visitorsRepository: IVisitorsRepository,
    private mailQueueProvider: IMailQueueProvider,
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

      const key: any = fs.readFileSync(
        path.resolve(__dirname, '../../../../utils/jwk/privateKey.pem'),
      );

      const JWTtoken = JWT.sign({ bie: mailHmacEncrypted }, key, {
        algorithm: 'RS256',
        expiresIn: '4d',
      });

      await this.mailQueueProvider.ToMailQueue(
        UpdateVisitorLinkMail(
          email,
          mailHmacEncrypted,
          visitorMailExists._id,
          token,
          JWTtoken,
          updateVisitorLink._id,
        ),
        'UpdateVisitorMail',
      );

      return updateVisitorLink;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

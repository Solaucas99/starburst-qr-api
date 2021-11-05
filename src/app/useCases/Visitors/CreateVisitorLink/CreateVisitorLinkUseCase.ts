import JWT from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

import createLinkToken from '../../../../services/utils/createLinkToken';
import VisitorLinkMail from '../../../../templates/VisitorLinkMail';
import { IVisitorLinkGen } from '../../../entities/IVisitorLinkGen';
import { IEncryptDataProvider } from '../../../providers/others/cryptojs/IEncryptDataProvider';
import { IValidationProvider } from '../../../providers/validators/IValidationProvider';
import { ICreateVisitorLinkRepository } from '../../../repositories/visitors/createVisitorLink/ICreateVisitorLinkRepository';
import { IError } from '../../../../interfaces/IError';
import { IVisitorsRepository } from '../../../repositories/visitors/IVisitorsRepository';
import { IMailQueueProvider } from '../../../providers/queue/IMailQueueProvider';

export class CreateVisitorLinkUseCase {
  private _errors: IError[] = [];

  constructor(
    private visitorLinkRepository: ICreateVisitorLinkRepository,
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

  public async execute(email: string): Promise<IVisitorLinkGen | void> {
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

      if (visitorMailExists) {
        this._errors.push({
          errStatus: 400,
          errMessage:
            'O e-mail inserido já está cadastrado na lista de visitantes.',
        });
        return;
      }

      const visitorMailLinkExists =
        await this.visitorLinkRepository.findVisitorLinkByAttribute(
          mailHmacEncrypted,
        );

      if (visitorMailLinkExists) {
        this._errors.push({
          errStatus: 400,
          errMessage:
            'O e-mail inserido do visitante já recebeu um link de cadastro. Aguarde até expirar o link (4 dias) para enviar um novo ou solicite para que o visitante utilize o link para se cadastrar',
        });
        return;
      }

      const token = createLinkToken();

      const mailAESEncrypted = this.encryptDataProvider.executeAES(email);

      const createdVisitorLink =
        await this.visitorLinkRepository.createVisitorLink({
          email: mailAESEncrypted,
          bie: mailHmacEncrypted,
          token,
        });

      if (!createdVisitorLink || !createdVisitorLink._id)
        throw new Error('Unexpected error');

      const key: any = fs.readFileSync(
        path.resolve(__dirname, '../../../../utils/jwk/privateKey.pem'),
      );

      const JWTtoken = JWT.sign({ bie: mailHmacEncrypted }, key, {
        algorithm: 'RS256',
        expiresIn: '4d',
      });

      await this.mailQueueProvider.ToMailQueue(
        VisitorLinkMail(
          email,
          mailHmacEncrypted,
          token,
          JWTtoken,
          createdVisitorLink._id,
        ),
        'SignUpVisitorMail',
      );

      return createdVisitorLink;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

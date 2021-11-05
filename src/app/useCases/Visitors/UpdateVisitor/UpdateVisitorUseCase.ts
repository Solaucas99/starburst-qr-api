import createPassword from '../../../../services/utils/createPassword';
import generateVisitorMail from '../../../../templates/VisitorMail';
import { IVisitor } from '../../../entities/IVisitor';
import { IEncryptDataProvider } from '../../../providers/others/cryptojs/IEncryptDataProvider';
import { IValidationProvider } from '../../../providers/validators/IValidationProvider';
import { IVisitorsRepository } from '../../../repositories/visitors/IVisitorsRepository';
import { ICreateUpdateVisitorLinkRepository } from '../../../repositories/visitors/updateVisitorLink/ICreateUpdateVisitorLinkRepository';
import { IError } from '../../../../interfaces/IError';
import { IMailQueueProvider } from '../../../providers/queue/IMailQueueProvider';

export class UpdateVisitorUseCase {
  private _errors: IError[] = [];

  constructor(
    private visitorsRepository: IVisitorsRepository,
    private updateVisitorLinkRepository: ICreateUpdateVisitorLinkRepository,
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

  public async execute(
    visitor: Partial<Omit<IVisitor, 'cpf'>>,
    id: string,
    updateVisitorLinkId: string,
  ): Promise<IVisitor | void | string> {
    try {
      const visitorMailConfirmed =
        await this.visitorsRepository.findVisitorById(id);

      if (visitorMailConfirmed?.confirmed_email === false) {
        this._errors.push({
          errStatus: 401,
          errMessage:
            'O visitante precisa confirmar o e-mail dele para poder alterar seus dados.',
        });
        return;
      }

      if (visitor.email) {
        if (!this.validationProvider.validateEmail(visitor.email)) {
          this._errors.push({
            errStatus: 400,
            errMessage: 'E-mail inválido.',
          });
          return;
        }

        const mailHmacEncrypted = this.encryptDataProvider.executeHmac(
          visitor.email,
        );

        const visitorMailExists =
          await this.visitorsRepository.findVisitorByAttribute({
            bie: mailHmacEncrypted,
          });

        if (visitorMailExists) {
          this._errors.push({
            errStatus: 400,
            errMessage:
              'O e-mail enviado do visitante já foi cadastrado anteriormente.',
          });
          return;
        }

        const generated_pass = createPassword();
        const mailAESEncrypted = this.encryptDataProvider.executeAES(
          visitor.email,
        );

        const newVisitor = await this.visitorsRepository.updateVisitorById(id, {
          ...visitor,
          bie: mailHmacEncrypted,
          email: mailAESEncrypted,
          generated_pass,
          confirmed_email: false,
        });

        if (!newVisitor) throw new Error('Unexpected error');

        await this.mailQueueProvider.ToMailQueue(
          generateVisitorMail(
            visitor.email,
            visitor.nome as string,
            generated_pass,
          ),
          'CodeSendVisitorMail',
        );

        return newVisitor;
      }

      const newVisitor = await this.visitorsRepository.updateVisitorById(id, {
        ...visitor,
      });

      const clearVisitorLink =
        await this.updateVisitorLinkRepository.deleteUpdateVisitorLinkById(
          updateVisitorLinkId,
        );

      if (!clearVisitorLink) {
        this._errors.push({
          errStatus: 400,
          errMessage: 'Ocorreu um erro! Tente novamente mais tarde.',
        });
        return;
      }

      if (!newVisitor || !newVisitor._id) throw new Error('Unexpected error');

      return newVisitor._id;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

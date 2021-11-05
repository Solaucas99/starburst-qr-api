import createPassword from '../../../../services/utils/createPassword';
import generateVisitorMail from '../../../../templates/VisitorMail';
import { IVisitor } from '../../../entities/IVisitor';
import { IEncryptDataProvider } from '../../../providers/others/cryptojs/IEncryptDataProvider';
import { IValidationProvider } from '../../../providers/validators/IValidationProvider';
import { IVisitorsRepository } from '../../../repositories/visitors/IVisitorsRepository';
import { IError } from '../../../../interfaces/IError';
import { IMailQueueProvider } from '../../../providers/queue/IMailQueueProvider';

export class CreateVisitorUseCase {
  private _errors: IError[] = [];

  constructor(
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

  public async execute(visitor: IVisitor): Promise<IVisitor | void> {
    try {
      const { email, cpf } = visitor;

      if (!this.validationProvider.validateCPF(cpf)) {
        this._errors.push({ errStatus: 400, errMessage: 'CPF inválido.' });
        return;
      }

      if (!this.validationProvider.validateEmail(email)) {
        this._errors.push({ errStatus: 400, errMessage: 'E-mail inválido.' });
        return;
      }

      const mailHmacEncrypted = this.encryptDataProvider.executeHmac(email);
      const cpfHmacEncrypted = this.encryptDataProvider.executeHmac(cpf);

      const visitorMailExists =
        await this.visitorsRepository.findVisitorByAttribute({
          bie: mailHmacEncrypted,
        });

      const visitorCpfExists =
        await this.visitorsRepository.findVisitorByAttribute({
          bic: cpfHmacEncrypted,
        });

      if (visitorMailExists) {
        this._errors.push({
          errStatus: 400,
          errMessage:
            'O e-mail enviado do visitante já foi cadastrado anteriormente.',
        });
        return;
      }

      if (visitorCpfExists) {
        this._errors.push({
          errStatus: 400,
          errMessage:
            'O CPF enviado do visitante já foi cadastrado anteriormente.',
        });
        return;
      }

      const generated_pass = createPassword();
      const mailAESEncrypted = this.encryptDataProvider.executeAES(email);
      const cpfAESEncrypted = this.encryptDataProvider.executeAES(cpf);

      const createdVisitor = await this.visitorsRepository.createVisitor({
        ...visitor,
        email: mailAESEncrypted,
        bie: mailHmacEncrypted,
        cpf: cpfAESEncrypted,
        bic: cpfHmacEncrypted,
        generated_pass,
      });

      if (!createdVisitor) throw new Error('Unexpected error');

      await this.mailQueueProvider.ToMailQueue(
        generateVisitorMail(email, visitor.nome, generated_pass),
        'CodeSendVisitorMail',
      );

      return createdVisitor;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

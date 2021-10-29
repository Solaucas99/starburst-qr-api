import validator from 'validator';
import createCPFDigits from '../../../../services/utils/createCPFDigits';
import { IValidationProvider } from '../IValidationProvider';

class ValidationProvider implements IValidationProvider {
  public validateCPF(cpf: string): boolean {
    if (cpf.length !== 11) throw new Error('CPF Inválido');

    if (cpf.charAt(0).repeat(11) === cpf) throw new Error('CPF Inválido');

    const cpfProcessado = cpf.slice(0, -2);

    const digit1 = createCPFDigits(cpfProcessado);
    const digit2 = createCPFDigits(cpfProcessado + digit1);

    const cpfLimpo = cpfProcessado + digit1 + digit2;

    return cpfLimpo === cpf;
  }

  public validateEmail(email: string): boolean {
    return validator.isEmail(email);
  }
}

export default new ValidationProvider();

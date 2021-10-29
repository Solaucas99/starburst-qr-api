export interface IValidationProvider {
  validateCPF(cpf: string): boolean;
  validateEmail(email: string): boolean;
}

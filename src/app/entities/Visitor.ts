import { IVisitor } from './IVisitor';

export class Visitor implements IVisitor {
  constructor(
    public email: string,
    public bie: string,
    public readonly cpf: string,
    public readonly bic: string,
    public nome: string,
    public phone?: string,
    public accept_promotions?: boolean,
    public generated_pass?: string,
    public confirmed_email?: boolean,
  ) {}
}

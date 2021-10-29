export interface IVisitor {
  email: string;
  cpf: string;
  nome: string;
  bie?: string;
  bic?: string;
  phone?: string;
  generated_pass?: string;
  confirmed_email?: boolean;
  accept_promotions?: boolean;
  _id?: string;
}

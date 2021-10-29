export interface IVisitorLinkGen {
  token: string;
  email: string;
  bie: string;
  createdAt?: Date;
  remember_in?: Date;
  expire_at?: Date;
  _id?: string;
}

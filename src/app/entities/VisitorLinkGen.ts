import { IVisitorLinkGen } from './IVisitorLinkGen';

export class VisitorLinkGen implements IVisitorLinkGen {
  constructor(
    public token: string,
    public email: string,
    public bie: string,
    public creation_date?: Date,
    public remember_in?: Date,
    public expire_at?: Date,
  ) {}
}

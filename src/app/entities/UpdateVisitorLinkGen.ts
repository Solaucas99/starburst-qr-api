import { IUpdateVisitorLinkGen } from './IUpdateVisitorLinkGen';

export class UpdateVisitorLinkGen implements IUpdateVisitorLinkGen {
  constructor(
    public token: string,
    public visitor: string,
    public creation_date?: Date,
    public remember_in?: Date,
    public expire_at?: Date,
  ) {}
}

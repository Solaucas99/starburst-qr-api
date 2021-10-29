import { IVisit } from './IVisit';

export class Visit implements IVisit {
  constructor(
    public date: Date,
    public visitor: string,
    public finished: boolean,
    public qrcode: string,
  ) {}
}

import { IVisitor } from './IVisitor';

export interface IVisit {
  date: Date;
  visitor: string | null | IVisitor;
  finished?: boolean;
  qrcode?: string;
  _id?: string;
}

import { ObjectId } from 'mongoose';

export interface IVisit {
  date: Date;
  visitor: string | ObjectId;
  finished?: boolean;
  qrcode?: string;
  _id?: string;
}

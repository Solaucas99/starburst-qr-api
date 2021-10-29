import { ObjectId } from 'mongoose';

export interface IUpdateVisitorLinkGen {
  token: string;
  visitor: string | ObjectId;
  createdAt?: Date;
  remember_in?: Date;
  expire_at?: Date;
  _id?: string;
}

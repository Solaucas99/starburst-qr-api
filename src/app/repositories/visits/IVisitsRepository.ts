import { IVisit } from '../../entities/IVisit';
import { ObjectId } from 'mongoose';

import { Document } from 'mongoose';

export type Attribute = {
  date?: Date;
  visitor?: string | ObjectId;
  finished?: boolean;
};

export interface IVisitsRepository {
  createVisit(visit: IVisit): Promise<(IVisit & Document) | null>;
  findAllVisits(): Promise<IVisit[] | null>;
  findVisitsByAttribute(
    attribute: Attribute,
  ): Promise<IVisit | IVisit[] | null>;
  findVisitById(id: string): Promise<(IVisit & Document) | null>;
  deleteVisitById(id: string): Promise<IVisit | null>;
}

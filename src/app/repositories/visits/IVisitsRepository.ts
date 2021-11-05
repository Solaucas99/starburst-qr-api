import { IVisit } from '../../entities/IVisit';

import { Document } from 'mongoose';
import { IVisitor } from '../../entities/IVisitor';

export type Attribute = {
  date?: Date;
  visitor?: string | null | IVisitor;
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

import { IVisitor } from '../../entities/IVisitor';
import { ObjectId } from 'mongoose';

export type Attribute = {
  email?: string;
  bie?: string;
  cpf?: string;
  bic?: string;
  nome?: string;
  phone?: string;
};

export interface IVisitorsRepository {
  createVisitor(visitor: IVisitor): Promise<IVisitor | null>;
  findAllVisitors(): Promise<IVisitor[] | null>;
  findVisitorByAttribute(attribute: Attribute): Promise<IVisitor | null>;
  findVisitorById(id: string | ObjectId): Promise<IVisitor | null>;
  updateVisitorById(
    id: string,
    data: Partial<Omit<IVisitor, '_id'>>,
  ): Promise<IVisitor | null>;
  deleteVisitorById(id: string): Promise<IVisitor | null>;
}

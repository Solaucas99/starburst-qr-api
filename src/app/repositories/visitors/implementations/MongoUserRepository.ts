import { pinoLogger } from '../../../../services/pino/pinoLogger';
import { IVisitor } from '../../../entities/IVisitor';
import { IVisitorsRepository, Attribute } from '../IVisitorsRepository';
import VisitorsSchema from '../schema/VisitorsSchema';

class MongoUserRepository implements IVisitorsRepository {
  public async createVisitor(visitor: IVisitor): Promise<IVisitor> {
    try {
      const visitorObject = VisitorsSchema.create(visitor);
      await visitorObject;

      return visitorObject;
    } catch (err: any) {
      pinoLogger('fatal', err.message);
      throw new Error(err);
    }
  }

  public async findAllVisitors(): Promise<IVisitor[] | null> {
    try {
      const visitors = await VisitorsSchema.find().sort({ _id: -1 }).lean();

      return visitors;
    } catch (err: any) {
      pinoLogger('fatal', err.message);
      throw new Error(err);
    }
  }

  public async findVisitorByAttribute(
    attribute: Attribute,
  ): Promise<IVisitor | null> {
    try {
      const visitorObject = await VisitorsSchema.findOne(attribute).lean();

      return visitorObject;
    } catch (err: any) {
      pinoLogger('fatal', err.message);
      throw new Error(err);
    }
  }

  public async findVisitorById(id: string): Promise<IVisitor | null> {
    try {
      const visitorObject = await VisitorsSchema.findById(id).lean();

      return visitorObject;
    } catch (err: any) {
      pinoLogger('fatal', err.message);
      throw new Error(err);
    }
  }

  public async updateVisitorById(
    id: string,
    data: Partial<Omit<IVisitor, '_id'>>,
  ): Promise<IVisitor | null> {
    try {
      const visitorObject = await VisitorsSchema.findByIdAndUpdate(
        id,
        { ...data },
        {
          new: true,
        },
      ).lean();

      return visitorObject;
    } catch (err: any) {
      pinoLogger('fatal', err.message);
      throw new Error(err);
    }
  }

  public async deleteVisitorById(id: string): Promise<IVisitor | null> {
    try {
      const visitorObject = await VisitorsSchema.findByIdAndRemove(id);

      return visitorObject;
    } catch (err: any) {
      pinoLogger('fatal', err.message);
      throw new Error(err);
    }
  }
}

export default new MongoUserRepository();

import { Document } from 'mongoose';
import { pinoLogger } from '../../../../services/pino/pinoLogger';
import { IVisit } from '../../../entities/IVisit';
import { IVisitsRepository, Attribute } from '../IVisitsRepository';
import VisitsSchema from '../schema/VisitsSchema';

class MongoVisitRepository implements IVisitsRepository {
  public async createVisit(visit: IVisit): Promise<IVisit & Document> {
    try {
      const visitObject = await VisitsSchema.create(visit);

      return visitObject.populate('visitor');
    } catch (err: any) {
      pinoLogger('fatal', err.message);
      throw new Error(err);
    }
  }

  public async findAllVisits(): Promise<IVisit[] | null> {
    try {
      const visits = await VisitsSchema.find()
        .populate('visitor')
        .sort({ _id: -1 })
        .lean();

      return visits;
    } catch (err: any) {
      pinoLogger('fatal', err.message);
      throw new Error(err);
    }
  }

  public async findVisitsByAttribute(
    attribute: Attribute,
  ): Promise<IVisit | IVisit[] | null> {
    try {
      const visitObject = await VisitsSchema.find(attribute)
        .populate('visitor')
        .sort({ _id: -1 })
        .lean();

      return visitObject;
    } catch (err: any) {
      pinoLogger('fatal', err.message);
      throw new Error(err);
    }
  }

  public async findVisitById(id: string): Promise<(IVisit & Document) | null> {
    try {
      const visitObject = await VisitsSchema.findById(id).populate('visitor');

      return visitObject;
    } catch (err: any) {
      pinoLogger('fatal', err.message);
      throw new Error(err);
    }
  }

  public async deleteVisitById(id: string): Promise<IVisit | null> {
    try {
      const visitObject = await VisitsSchema.findByIdAndRemove(id);

      return visitObject;
    } catch (err: any) {
      pinoLogger('fatal', err.message);
      throw new Error(err);
    }
  }
}

export default new MongoVisitRepository();

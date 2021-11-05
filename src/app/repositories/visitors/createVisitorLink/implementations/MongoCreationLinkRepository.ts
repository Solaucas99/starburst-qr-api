import CreationVisitorLinkSchema from '../schema/CreationVisitorLinkSchema';
import { ICreateVisitorLinkRepository } from '../ICreateVisitorLinkRepository';
import { IVisitorLinkGen } from '../../../../entities/IVisitorLinkGen';
import { pinoLogger } from '../../../../../services/pino/pinoLogger';

class MongoCreationLinkRepository implements ICreateVisitorLinkRepository {
  public async createVisitorLink(
    attributes: IVisitorLinkGen,
  ): Promise<IVisitorLinkGen | null> {
    try {
      const link = await CreationVisitorLinkSchema.create(attributes);

      return link;
    } catch (err: any) {
      pinoLogger('fatal', err.message);
      throw new Error(err);
    }
  }

  public async findVisitorLinkById(
    id: string,
  ): Promise<IVisitorLinkGen | null> {
    try {
      const link = await CreationVisitorLinkSchema.findById(id);

      return link;
    } catch (err: any) {
      pinoLogger('fatal', err.message);
      throw new Error(err);
    }
  }

  public async findVisitorLinkByAttribute(
    bie: string,
  ): Promise<IVisitorLinkGen | null> {
    try {
      const link = await CreationVisitorLinkSchema.findOne({ bie })
        .sort({
          _id: -1,
        })
        .lean();

      return link;
    } catch (err: any) {
      pinoLogger('fatal', err.message);
      throw new Error(err);
    }
  }

  public async deleteVisitorLinkById(
    id: string,
  ): Promise<IVisitorLinkGen | null> {
    try {
      const link = await CreationVisitorLinkSchema.findByIdAndRemove(id);

      return link;
    } catch (err: any) {
      pinoLogger('fatal', err.message);
      throw new Error(err);
    }
  }
}

export default new MongoCreationLinkRepository();

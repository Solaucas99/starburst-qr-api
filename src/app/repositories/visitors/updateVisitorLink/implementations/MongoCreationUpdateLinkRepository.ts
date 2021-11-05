import CreationUpdateVisitorLinkSchema from '../schema/CreationUpdateVisitorLinkSchema';
import { ICreateUpdateVisitorLinkRepository } from '../ICreateUpdateVisitorLinkRepository';
import { IUpdateVisitorLinkGen } from '../../../../entities/IUpdateVisitorLinkGen';
import { pinoLogger } from '../../../../../services/pino/pinoLogger';

class MongoCreationUpdateLinkRepository
  implements ICreateUpdateVisitorLinkRepository
{
  public async createUpdateVisitorLink(
    attributes: IUpdateVisitorLinkGen,
  ): Promise<IUpdateVisitorLinkGen | null> {
    try {
      const link = await CreationUpdateVisitorLinkSchema.create(attributes);

      return link;
    } catch (err: any) {
      pinoLogger('fatal', err.message);
      throw new Error(err);
    }
  }

  public async findUpdateVisitorLinkById(
    id: string,
  ): Promise<IUpdateVisitorLinkGen | null> {
    try {
      const link = await CreationUpdateVisitorLinkSchema.findById(id)
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

  public async findUpdateVisitorLinkByAttribute(
    visitor: string,
  ): Promise<IUpdateVisitorLinkGen | null> {
    try {
      const link = await CreationUpdateVisitorLinkSchema.findOne({ visitor })
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

  public async deleteUpdateVisitorLinkById(
    id: string,
  ): Promise<IUpdateVisitorLinkGen | null> {
    try {
      const link = await CreationUpdateVisitorLinkSchema.findByIdAndRemove(id);

      return link;
    } catch (err: any) {
      pinoLogger('fatal', err.message);
      throw new Error(err);
    }
  }
}

export default new MongoCreationUpdateLinkRepository();

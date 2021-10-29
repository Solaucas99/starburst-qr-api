import { IVisitorLinkGen } from '../../../entities/IVisitorLinkGen';

export interface ICreateVisitorLinkRepository {
  createVisitorLink(
    attributes: IVisitorLinkGen,
  ): Promise<IVisitorLinkGen | null>;
  findVisitorLinkById(id: string): Promise<IVisitorLinkGen | null>;
  findVisitorLinkByAttribute(
    attribute: string,
  ): Promise<IVisitorLinkGen | null>;
  deleteVisitorLinkById(id: string): Promise<IVisitorLinkGen | null>;
}

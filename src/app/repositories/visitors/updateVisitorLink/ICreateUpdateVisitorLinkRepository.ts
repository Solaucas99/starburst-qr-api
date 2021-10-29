import { IUpdateVisitorLinkGen } from '../../../entities/IUpdateVisitorLinkGen';

export interface ICreateUpdateVisitorLinkRepository {
  createUpdateVisitorLink(
    attributes: IUpdateVisitorLinkGen,
  ): Promise<IUpdateVisitorLinkGen | null>;

  findUpdateVisitorLinkById(id: string): Promise<IUpdateVisitorLinkGen | null>;

  findUpdateVisitorLinkByAttribute(
    attributeVisitorId: string,
  ): Promise<IUpdateVisitorLinkGen | null>;

  deleteUpdateVisitorLinkById(
    id: string,
  ): Promise<IUpdateVisitorLinkGen | null>;
}

import { Request, Response } from 'express';
import { CreateUpdateVisitorLinkUseCase } from './CreateUpdateVisitorLinkUseCase';

export class CreateUpdateVisitorLinkController {
  constructor(
    private createUpdateVisitorLinkUseCase: CreateUpdateVisitorLinkUseCase,
  ) {
    this.createUpdateVisitorLink = this.createUpdateVisitorLink.bind(this);
  }

  public async createUpdateVisitorLink(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { email } = req.body;

      await this.createUpdateVisitorLinkUseCase.execute(email);

      if (this.createUpdateVisitorLinkUseCase.errors.length > 0) {
        const err = this.createUpdateVisitorLinkUseCase.errors[0];
        this.createUpdateVisitorLinkUseCase.errors = [];
        return res.status(err.errStatus).json({ message: err.errMessage });
      }

      return res.status(200).json({
        message:
          'E-mail enviado para o visitante. Assim que ele efetuar as alterações, ele voltará a aparecer na lista de visitantes.',
      });
    } catch (err: any) {
      return res.status(400).json({ message: 'Unexpected Error' });
    }
  }
}

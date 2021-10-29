import { Request, Response } from 'express';
import { CreateVisitorLinkUseCase } from './CreateVisitorLinkUseCase';

export class CreateVisitorLinkController {
  constructor(private createVisitorLinkUseCase: CreateVisitorLinkUseCase) {
    this.createVisitorLink = this.createVisitorLink.bind(this);
  }

  public async createVisitorLink(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { email } = req.body;

      await this.createVisitorLinkUseCase.execute(email);

      if (this.createVisitorLinkUseCase.errors.length > 0) {
        const err = this.createVisitorLinkUseCase.errors[0];
        this.createVisitorLinkUseCase.errors = [];
        return res.status(err.errStatus).json({ message: err.errMessage });
      }

      return res.status(200).json({
        message:
          'E-mail enviado para o visitante. Assim que ele efetuar o cadastro, ele aparecerá na lista de visitantes.',
      });
    } catch (err: any) {
      return res.status(400).json({ message: 'Unexpected Error' });
    }
  }
}

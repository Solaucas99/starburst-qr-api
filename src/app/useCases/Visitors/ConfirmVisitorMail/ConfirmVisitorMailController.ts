import { Request, Response } from 'express';
import { ConfirmVisitorMailUseCase } from './ConfirmVisitorMailUseCase';

export class ConfirmVisitorMailController {
  constructor(private confirmVisitorMailUseCase: ConfirmVisitorMailUseCase) {
    this.confirmVisitorMail = this.confirmVisitorMail.bind(this);
  }

  public async confirmVisitorMail(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const { generated_pass, visitor_link_id } = req.body;

      const visitor = await this.confirmVisitorMailUseCase.execute(
        id,
        generated_pass,
        visitor_link_id,
      );

      if (this.confirmVisitorMailUseCase.errors.length > 0) {
        const err = this.confirmVisitorMailUseCase.errors[0];
        this.confirmVisitorMailUseCase.errors = [];
        return res.status(err.errStatus).json({ message: err.errMessage });
      }

      return res.status(200).json({
        message: 'Visitante confirmado com sucesso!',
        data: visitor,
      });
    } catch (err: any) {
      return res.status(400).json({ message: 'Unexpected Error' });
    }
  }
}

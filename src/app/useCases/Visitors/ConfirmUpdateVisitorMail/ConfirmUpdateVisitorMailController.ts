import { Request, Response } from 'express';
import { ConfirmUpdateVisitorMailUseCase } from './ConfirmUpdateVisitorMailUseCase';

export class ConfirmUpdateVisitorMailController {
  constructor(
    private confirmUpdateVisitorMailUseCase: ConfirmUpdateVisitorMailUseCase,
  ) {
    this.confirmUpdateVisitorMail = this.confirmUpdateVisitorMail.bind(this);
  }

  public async confirmUpdateVisitorMail(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const { generated_pass, visitor_link_id } = req.body;

      await this.confirmUpdateVisitorMailUseCase.execute(
        id,
        generated_pass,
        visitor_link_id,
      );

      if (this.confirmUpdateVisitorMailUseCase.errors.length > 0) {
        const err = this.confirmUpdateVisitorMailUseCase.errors[0];
        this.confirmUpdateVisitorMailUseCase.errors = [];
        return res.status(err.errStatus).json({ message: err.errMessage });
      }

      return res.status(200).json({
        message: 'Visitante confirmado com sucesso!',
      });
    } catch (err: any) {
      return res.status(400).json({ message: 'Unexpected Error' });
    }
  }
}

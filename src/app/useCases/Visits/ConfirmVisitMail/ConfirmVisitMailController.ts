import { Request, Response } from 'express';
import { pinoLogger } from '../../../../services/pino/pinoLogger';
import { ConfirmVisitMailUseCase } from './ConfirmVisitMailUseCase';

export class ConfirmVisitMailController {
  constructor(private confirmVisitMailUseCase: ConfirmVisitMailUseCase) {
    this.confirmVisitMail = this.confirmVisitMail.bind(this);
  }

  public async confirmVisitMail(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { data } = req.body;

      const visit = await this.confirmVisitMailUseCase.execute(data);

      if (this.confirmVisitMailUseCase.errors.length > 0) {
        const err = this.confirmVisitMailUseCase.errors[0];
        this.confirmVisitMailUseCase.errors = [];
        return res.status(err.errStatus).json({ message: err.errMessage });
      }

      return res.status(200).json({
        message: 'Visita autenticada com sucesso!',
        data: visit,
      });
    } catch (err: any) {
      pinoLogger('error', err.message);
      return res.status(400).json({ message: 'Unexpected Error' });
    }
  }
}

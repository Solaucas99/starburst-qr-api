import { Request, Response } from 'express';
import { pinoLogger } from '../../../../services/pino/pinoLogger';
import { CreateVisitUseCase } from './CreateVisitUseCase';

export class CreateVisitController {
  constructor(private createVisitUseCase: CreateVisitUseCase) {
    this.createVisit = this.createVisit.bind(this);
  }

  public async createVisit(req: Request, res: Response): Promise<Response> {
    try {
      const { date, visitor } = req.body;

      const dateFiltered = new Date(
        date.year,
        date.month - 1,
        date.day,
        date.hour,
        date.minutes,
      );

      const visit = await this.createVisitUseCase.execute({
        visitor,
        date: dateFiltered,
      });

      if (this.createVisitUseCase.errors.length > 0) {
        const err = this.createVisitUseCase.errors[0];
        this.createVisitUseCase.errors = [];
        return res.status(err.errStatus).json({ message: err.errMessage });
      }

      return res.status(200).json({
        message:
          'Visita cadastrada com sucesso! Cheque o e-mail para pegar o QRCode',
        data: visit,
      });
    } catch (err: any) {
      pinoLogger('error', err.message);
      return res.status(400).json({ message: 'Unexpected Error' });
    }
  }
}

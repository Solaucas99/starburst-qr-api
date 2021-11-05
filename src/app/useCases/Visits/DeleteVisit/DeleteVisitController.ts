import { Request, Response } from 'express';
import { pinoLogger } from '../../../../services/pino/pinoLogger';
import { DeleteVisitUseCase } from './DeleteVisitUseCase';

export class DeleteVisitController {
  constructor(private deleteVisitUseCase: DeleteVisitUseCase) {
    this.deleteVisit = this.deleteVisit.bind(this);
  }

  public async deleteVisit(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      await this.deleteVisitUseCase.execute(id);

      if (this.deleteVisitUseCase.errors.length > 0) {
        const err = this.deleteVisitUseCase.errors[0];
        this.deleteVisitUseCase.errors = [];
        return res.status(err.errStatus).json({ message: err.errMessage });
      }

      return res.status(200).json({ message: 'Visita removida com sucesso!' });
    } catch (err: any) {
      pinoLogger('error', err.message);
      return res.status(400).json({ message: 'Unexpected Error' });
    }
  }
}

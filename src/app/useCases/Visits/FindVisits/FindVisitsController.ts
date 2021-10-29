import { Request, Response } from 'express';
import { FindVisitsUseCase } from './FindVisitsUseCase';

export class FindVisitController {
  constructor(private findVisitUseCase: FindVisitsUseCase) {
    this.findVisit = this.findVisit.bind(this);
  }

  public async findVisit(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (id) {
        const visit = await this.findVisitUseCase.executeById(id);

        if (this.findVisitUseCase.errors.length > 0) {
          const err = this.findVisitUseCase.errors[0];
          this.findVisitUseCase.errors = [];
          return res.status(err.errStatus).json({ message: err.errMessage });
        }

        return res
          .status(200)
          .json({ message: 'Visita encontrada com sucesso.', data: visit });
      }

      const visit = await this.findVisitUseCase.executeByAttribute({
        ...req.query,
      });

      if (this.findVisitUseCase.errors.length > 0) {
        const err = this.findVisitUseCase.errors[0];
        this.findVisitUseCase.errors = [];
        return res.status(err.errStatus).json({ message: err.errMessage });
      }

      return res
        .status(200)
        .json({ message: 'Visita(s) encontrada(s) com sucesso.', data: visit });
    } catch (err: any) {
      return res.status(400).json({ message: 'Unexpected Error' });
    }
  }
}

import { Request, Response } from 'express';
import { FindAllVisitsUseCase } from './FindAllVisitsUseCase';

export class FindAllVisitsController {
  constructor(private findAllVisitsUseCase: FindAllVisitsUseCase) {
    this.findAllVisits = this.findAllVisits.bind(this);
  }

  public async findAllVisits(req: Request, res: Response): Promise<Response> {
    try {
      const visits = await this.findAllVisitsUseCase.execute();

      if (this.findAllVisitsUseCase.errors.length > 0) {
        const err = this.findAllVisitsUseCase.errors[0];
        this.findAllVisitsUseCase.errors = [];
        return res.status(err.errStatus).json({ message: err.errMessage });
      }

      return res.status(200).json({
        message: 'Visitas encontradas com sucesso!',
        data: visits,
      });
    } catch (err: any) {
      return res.status(400).json({ message: 'Unexpected Error' });
    }
  }
}

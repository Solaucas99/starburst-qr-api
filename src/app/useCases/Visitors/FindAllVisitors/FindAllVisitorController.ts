import { Request, Response } from 'express';
import { pinoLogger } from '../../../../services/pino/pinoLogger';
import { FindAllVisitorUseCase } from './FindAllVisitorUseCase';

export class FindAllVisitorController {
  constructor(private findAllVisitorUseCase: FindAllVisitorUseCase) {
    this.findAllVisitor = this.findAllVisitor.bind(this);
  }

  public async findAllVisitor(req: Request, res: Response): Promise<Response> {
    try {
      const visitors = await this.findAllVisitorUseCase.execute();

      if (this.findAllVisitorUseCase.errors.length > 0) {
        const err = this.findAllVisitorUseCase.errors[0];
        this.findAllVisitorUseCase.errors = [];
        return res.status(err.errStatus).json({ message: err.errMessage });
      }

      return res.status(200).json({
        message: 'Visitantes encontrados com sucesso!',
        data: visitors,
      });
    } catch (err: any) {
      pinoLogger('error', err.message);
      return res.status(400).json({ message: 'Unexpected Error' });
    }
  }
}

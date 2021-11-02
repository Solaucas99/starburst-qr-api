import { Request, Response } from 'express';
import { FindVisitorUseCase } from './FindVisitorUseCase';

export class FindVisitorController {
  constructor(private findVisitorUseCase: FindVisitorUseCase) {
    this.findVisitor = this.findVisitor.bind(this);
  }

  public async findVisitor(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (id) {
        const visitor = await this.findVisitorUseCase.executeById(id);

        if (this.findVisitorUseCase.errors.length > 0) {
          const err = this.findVisitorUseCase.errors[0];
          this.findVisitorUseCase.errors = [];
          return res.status(err.errStatus).json({ message: err.errMessage });
        }

        return res.status(200).json({
          message: 'Visitante encontrado com sucesso.',
          data: visitor,
        });
      }

      const visitors = await this.findVisitorUseCase.executeByAttribute({
        bie: req.query.bie as string,
      });

      if (this.findVisitorUseCase.errors.length > 0) {
        const err = this.findVisitorUseCase.errors[0];
        this.findVisitorUseCase.errors = [];
        return res.status(err.errStatus).json({ message: err.errMessage });
      }

      return res.status(200).json({
        message: 'Visitante(s) encontrado(s) com sucesso.',
        visitorId: visitors?._id,
        visitorData: {
          name: visitors?.nome,
          email: visitors?.email,
          phone: visitors?.phone,
        },
      });
    } catch (err: any) {
      return res.status(400).json({ message: 'Unexpected Error' });
    }
  }
}

import { Request, Response } from 'express';
import { DeleteVisitorUseCase } from './DeleteVisitorUseCase';

export class DeleteVisitorController {
  constructor(private deleteVisitorUseCase: DeleteVisitorUseCase) {
    this.deleteVisitor = this.deleteVisitor.bind(this);
  }

  public async deleteVisitor(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      await this.deleteVisitorUseCase.execute(id);

      if (this.deleteVisitorUseCase.errors.length > 0) {
        const err = this.deleteVisitorUseCase.errors[0];
        this.deleteVisitorUseCase.errors = [];
        return res.status(err.errStatus).json({ message: err.errMessage });
      }

      return res
        .status(200)
        .json({ message: 'Visitante removido com sucesso!' });
    } catch (err: any) {
      return res.status(400).json({ message: 'Unexpected Error' });
    }
  }
}

import { Request, Response } from 'express';
import { UpdateVisitorUseCase } from './UpdateVisitorUseCase';

export class UpdateVisitorController {
  constructor(private updateVisitorUseCase: UpdateVisitorUseCase) {
    this.updateVisitor = this.updateVisitor.bind(this);
  }

  public async updateVisitor(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const newVisitor = await this.updateVisitorUseCase.execute(req.body, id);

      if (this.updateVisitorUseCase.errors.length > 0) {
        const err = this.updateVisitorUseCase.errors[0];
        this.updateVisitorUseCase.errors = [];
        return res.status(err.errStatus).json({ message: err.errMessage });
      }

      if (req.body.email) {
        return res.status(200).json({
          message:
            'Visitante atualizado! Verifique seu e-mail para confirmar a atualização.',
          data: newVisitor,
        });
      }

      return res.status(200).json({
        message: 'Visitante atualizado!',
        data: newVisitor,
      });
    } catch (err: any) {
      return res.status(400).json({ message: 'Unexpected Error' });
    }
  }
}

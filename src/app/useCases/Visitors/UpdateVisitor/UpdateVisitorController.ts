import { Request, Response } from 'express';
import { UpdateVisitorUseCase } from './UpdateVisitorUseCase';

export class UpdateVisitorController {
  constructor(private updateVisitorUseCase: UpdateVisitorUseCase) {
    this.updateVisitor = this.updateVisitor.bind(this);
  }

  public async updateVisitor(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { visitorAttributes, updateVisitorLinkId } = req.body;

      if (!visitorAttributes || !updateVisitorLinkId) {
        return res.status(400).json({
          message: 'Ocorreu um erro ao enviar os atributos.',
        });
      }

      const visitorId = await this.updateVisitorUseCase.execute(
        visitorAttributes,
        id,
        updateVisitorLinkId,
      );

      if (this.updateVisitorUseCase.errors.length > 0) {
        const err = this.updateVisitorUseCase.errors[0];
        this.updateVisitorUseCase.errors = [];
        return res.status(err.errStatus).json({ message: err.errMessage });
      }

      if (visitorAttributes.email) {
        return res.status(200).json({
          message:
            'Visitante atualizado! Verifique seu e-mail para confirmar a atualização.',
          visitorId,
        });
      }

      return res.status(200).json({
        message: 'Visitante atualizado!',
        visitorId,
      });
    } catch (err: any) {
      return res.status(400).json({ message: 'Unexpected Error' });
    }
  }
}

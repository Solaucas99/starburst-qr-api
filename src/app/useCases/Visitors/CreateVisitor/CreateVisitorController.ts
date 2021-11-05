import { Request, Response } from 'express';
import { pinoLogger } from '../../../../services/pino/pinoLogger';
import { CreateVisitorUseCase } from './CreateVisitorUseCase';

export class CreateVisitorController {
  constructor(private createVisitorUseCase: CreateVisitorUseCase) {
    this.createVisitor = this.createVisitor.bind(this);
  }

  public async createVisitor(req: Request, res: Response): Promise<Response> {
    try {
      const { email, cpf, nome, phone, accept_promotions } = req.body;

      const visitor = await this.createVisitorUseCase.execute({
        email,
        cpf,
        nome,
        phone,
        accept_promotions,
      });

      if (this.createVisitorUseCase.errors.length > 0) {
        const err = this.createVisitorUseCase.errors[0];
        this.createVisitorUseCase.errors = [];
        return res.status(err.errStatus).json({ message: err.errMessage });
      }

      return res.status(200).json({
        message:
          'Visitante cadastrado com sucesso! Cheque seu e-mail para confirmar sua conta.',
        visitorId: visitor?._id,
      });
    } catch (err: any) {
      pinoLogger('error', err.message);
      return res.status(400).json({ message: 'Unexpected Error' });
    }
  }
}

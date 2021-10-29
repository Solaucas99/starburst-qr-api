import { Request, Response } from 'express';
import { ValidateVisitorLinkUseCase } from './ValidateVisitorLinkUseCase';

export class ValidateVisitorLinkController {
  constructor(private validateVisitorLinkUseCase: ValidateVisitorLinkUseCase) {
    this.validateVisitorLink = this.validateVisitorLink.bind(this);
  }

  public async validateVisitorLink(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { token, visitor_bie } = req.body;
      const { id } = req.params;

      const isVisitorInValidationProcess =
        await this.validateVisitorLinkUseCase.execute(token, id, visitor_bie);

      if (this.validateVisitorLinkUseCase.errors.length > 0) {
        const err = this.validateVisitorLinkUseCase.errors[0];
        this.validateVisitorLinkUseCase.errors = [];
        return res.status(err.errStatus).json({ message: err.errMessage });
      }

      if (isVisitorInValidationProcess) {
        return res.status(200).json({
          message: 'Token validado com sucesso!.',
          is_in_validation: true,
        });
      }

      return res.status(200).json({
        message: 'Token validado com sucesso!.',
        is_in_validation: false,
      });
    } catch (err: any) {
      return res.status(400).json({ message: 'Unexpected Error' });
    }
  }
}

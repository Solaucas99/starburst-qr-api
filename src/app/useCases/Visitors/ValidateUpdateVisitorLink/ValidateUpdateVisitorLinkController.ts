import { Request, Response } from 'express';
import { ValidateUpdateVisitorLinkUseCase } from './ValidateUpdateVisitorLinkUseCase';

export class ValidateUpdateVisitorLinkController {
  constructor(
    private validateUpdateVisitorLinkUseCase: ValidateUpdateVisitorLinkUseCase,
  ) {
    this.validateUpdateVisitorLink = this.validateUpdateVisitorLink.bind(this);
  }

  public async validateUpdateVisitorLink(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { token, visitor_id } = req.body;
      const { id } = req.params;

      const isVisitorInValidationProcess =
        await this.validateUpdateVisitorLinkUseCase.execute(
          token,
          id,
          visitor_id,
        );

      if (this.validateUpdateVisitorLinkUseCase.errors.length > 0) {
        const err = this.validateUpdateVisitorLinkUseCase.errors[0];
        this.validateUpdateVisitorLinkUseCase.errors = [];
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

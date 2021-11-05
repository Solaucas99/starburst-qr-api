import { Request, Response } from 'express';
import { pinoLogger } from '../../../pino/pinoLogger';
import { UpdateUserAttrUseCase } from './UpdateUserAttrUseCase';

export class UpdateUserAttrController {
  constructor(private updateUserAttrUseCase: UpdateUserAttrUseCase) {
    // Binding the this to the class to not lost the context of function in express.
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.handleUserUpdateConfirm = this.handleUserUpdateConfirm.bind(this);
  }

  public async handleUserUpdate(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { attribute } = req.body;

    const { acc_token } = req.cookies;

    try {
      const { CodeDeliveryDetailsList } =
        await this.updateUserAttrUseCase.updateUserAttr({
          accessToken: acc_token,
          attribute: attribute,
        });

      if (!CodeDeliveryDetailsList)
        return res.status(400).json({ message: 'Unexpected error' });

      if (CodeDeliveryDetailsList.length > 0) {
        return res.status(200).json({
          message: `Recebemos sua requisição de atualização. Acesse o email ${attribute.Value} e envie o código recebido a seguir`,
        });
      }
      return res.status(200).json({
        message: 'Atributo atualizado com sucesso',
      });
    } catch (err: any) {
      pinoLogger('error', err.message);
      return res.status(400).json({
        message: err.message || 'Unexpected error',
      });
    }
  }

  public async handleUserUpdateConfirm(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { acc_token } = req.cookies;
    const { attribute, confirmation_code } = req.body;

    if (!confirmation_code)
      return res
        .status(400)
        .json({ message: 'Código de confirmação não enviado' });

    try {
      await this.updateUserAttrUseCase.confirmUserAttrUpdate({
        acc_token,
        attribute,
        confirmation_code,
      });

      return res.status(200).json({
        message: `Seu código foi confirmado com sucesso!`,
      });
    } catch (err: any) {
      pinoLogger('error', err.message);
      return res.status(400).json({
        message: err.message || 'Unexpected error',
      });
    }
  }
}

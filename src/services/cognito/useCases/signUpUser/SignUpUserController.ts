import { Request, Response } from 'express';
import { SignUpUserUseCase } from './SignUpUserUseCase';

export class SignUpUserController {
  constructor(private signUpUserUseCase: SignUpUserUseCase) {
    // Binding the this to the class to not lost the context of function in express.
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleUserSignUpConfirm = this.handleUserSignUpConfirm.bind(this);
  }

  public async handleSignUp(req: Request, res: Response): Promise<Response> {
    const { name, username, email, password, phone_number, cpf_number } =
      req.body;

    try {
      const { CodeDeliveryDetails } = await this.signUpUserUseCase.signUpUser({
        name,
        username,
        email,
        password,
        phone_number,
        cpf_number,
      });

      if (!CodeDeliveryDetails)
        return res.status(400).json({ message: 'Unexpected error' });

      return res.status(200).json({
        message: `Recebemos seus dados de cadastro, mas ainda falta uma etapa. Você precisa confirmar seu e-mail para continuar. Acesse o email ${CodeDeliveryDetails['Destination']} e envie o código recebido a seguir`,
      });
    } catch (err: any) {
      return res.status(400).json({
        message: err.message || 'Unexpected error',
      });
    }
  }

  public async handleUserSignUpConfirm(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const username = req.payload['cognito:username'];
    const { confirmation_code } = req.body;

    if (!confirmation_code)
      return res
        .status(400)
        .json({ message: 'Código de confirmação não enviado' });

    try {
      await this.signUpUserUseCase.confirmUserSignUp({
        username,
        confirmation_code,
      });

      return res.status(200).json({
        message: `Bem-vindo ${username}. Seu cadastro foi confirmado com sucesso!`,
      });
    } catch (err: any) {
      return res.status(400).json({
        message: err.message || 'Unexpected error',
      });
    }
  }
}

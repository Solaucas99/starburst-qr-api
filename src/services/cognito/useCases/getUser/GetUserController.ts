import { Request, Response } from 'express';
import { GetUserUseCase } from './GetUserUseCase';

export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {
    this.getUser = this.getUser.bind(this);
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const { accessToken } = req.cookies;
      // const { email_confirmed } = req.payload;

      console.log(req.payload);

      // if (!email_confirmed)
      //   return res.status(401).json({
      //     message: 'Você precisa confirmar seu e-mail para acessar essa página',
      //   });

      const data = await this.getUserUseCase.getUser(accessToken);

      return res.status(200).json({ data });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

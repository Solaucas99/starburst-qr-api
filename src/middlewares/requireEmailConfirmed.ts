import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export async function requireEmailConfirmed(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  try {
    if (!req.payload.email_verified) {
      return res.status(401).json({
        message:
          'Para realizar essa ação, você primeiro precisa confirmar seu e-mail',
      });
    }
    next();
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
}

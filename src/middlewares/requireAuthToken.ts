import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import JWKtoPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import { pinoLogger } from '../services/pino/pinoLogger';

dotenv.config();

export async function requireAuthToken(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token)
      return res
        .status(401)
        .json({ message: 'Dados inválidos, tente fazer login novamente' });

    const jwk: any = fs.readFileSync(
      path.resolve(__dirname, '../utils/jwk/publicKey.json'),
    );

    const pemToken = JWKtoPem(JSON.parse(jwk));

    const decodedToken = jwt.verify(
      token,
      pemToken,
      { algorithms: ['RS256'] },
      (err, decoded) => {
        if (err) {
          pinoLogger('error', err.message);
          return res.status(401).json({ message: err.message });
        }

        if (decoded !== undefined) {
          return decoded;
        }

        return res
          .status(401)
          .json({ message: 'An error has occurred while decoding the JWT.' });
      },
    );

    req.payload = decodedToken;

    next();
  } catch (err: any) {
    pinoLogger('error', err.message);
    return res.status(401).json({ message: err.message });
  }
}

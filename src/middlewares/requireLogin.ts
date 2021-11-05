import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import JWKtoPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import { pinoLogger } from '../services/pino/pinoLogger';

dotenv.config();

export async function requireLogin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  try {
    const data = await axios.get(
      process.env.AWS_COGNITO_JSONWEBKEY_URL as string,
    );

    if (!data.data.keys) throw new Error('Unexpected Error has ocurred');

    const idToken = req.cookies.idToken;
    const accessToken = req.cookies.accessToken;

    if (!idToken || !accessToken)
      return res
        .status(401)
        .json({ message: 'Dados inválidos, tente fazer login novamente' });

    const pemIdToken = JWKtoPem(data.data.keys[0]);
    const pemAccessToken = JWKtoPem(data.data.keys[1]);

    const decodedIdToken = jwt.verify(
      idToken,
      pemIdToken,
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

    jwt.verify(
      accessToken,
      pemAccessToken,
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

    req.payload = decodedIdToken;

    next();
  } catch (err: any) {
    pinoLogger('error', err.message);
    return res.status(401).json({ message: err.message });
  }
}

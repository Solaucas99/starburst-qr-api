/* eslint-disable */
import * as jwkToPem from 'jwk-to-pem';

declare module 'jwk-to-pem' {
  declare interface RSA {
    alg: string;
    kid: string;
    use: string;
    kty: 'RSA';
  }
}

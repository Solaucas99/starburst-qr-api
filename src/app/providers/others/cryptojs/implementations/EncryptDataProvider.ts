import { IEncryptDataProvider, DataToEncrypt } from '../IEncryptDataProvider';
import cryptojs from 'crypto-js';

export class EncryptDataProvider implements IEncryptDataProvider {
  public executeHmac(dataToEncrypt: DataToEncrypt): string {
    const toEncrypt = JSON.stringify(dataToEncrypt);

    const encrypt = cryptojs
      .HmacSHA512(toEncrypt, process.env.SECRET_CRYPTO_JS as string)
      .toString();

    return encrypt;
  }

  public executeAES(dataToEncrypt: DataToEncrypt): string {
    const toEncrypt = JSON.stringify(dataToEncrypt);

    const encrypt = cryptojs.AES.encrypt(
      toEncrypt,
      process.env.SECRET_CRYPTO_JS as string,
    ).toString();

    return encrypt;
  }
}

export default new EncryptDataProvider();

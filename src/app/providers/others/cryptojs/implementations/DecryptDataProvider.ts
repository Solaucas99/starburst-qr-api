import cryptojs from 'crypto-js';
import { IDecryptDataProvider } from '../IDecryptDataProvider';

class DecryptDataProvider implements IDecryptDataProvider {
  public executeAES(dataToDecrypt: string): string {
    const decrypt = cryptojs.AES.decrypt(
      dataToDecrypt,
      process.env.SECRET_CRYPTO_JS as string,
    ).toString(cryptojs.enc.Utf8);

    const parsed = JSON.parse(decrypt);

    return parsed;
  }
}

export default new DecryptDataProvider();

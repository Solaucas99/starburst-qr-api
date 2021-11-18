import cryptojs from 'crypto-js';
import { IDecryptDataProvider } from '../IDecryptDataProvider';

class DecryptDataProvider implements IDecryptDataProvider {
  public executeAES(dataToDecrypt: string): string {
    if (!dataToDecrypt) return '';

    const decrypt = cryptojs.AES.decrypt(
      dataToDecrypt,
      process.env.SECRET_CRYPTO_JS as string,
    ).toString(cryptojs.enc.Utf8);

    return JSON.parse(decrypt); //eslint-disable-line
  }
}

export default new DecryptDataProvider();

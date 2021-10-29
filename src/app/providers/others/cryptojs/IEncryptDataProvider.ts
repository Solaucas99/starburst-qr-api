export type DataToEncrypt = Record<string, string> | string;

export interface IEncryptDataProvider {
  executeHmac(dataToEncrypt: DataToEncrypt): string;
  executeAES(dataToEncrypt: DataToEncrypt): string;
}

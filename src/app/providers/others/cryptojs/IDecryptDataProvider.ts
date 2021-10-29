export interface IDecryptDataProvider {
  executeAES(dataToDecrypt: string): string;
}

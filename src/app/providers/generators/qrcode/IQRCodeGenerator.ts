export interface IQRCodeGenerator {
  generate(visitorCpf: string, visitId: string): string;
}

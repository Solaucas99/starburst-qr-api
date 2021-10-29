export default function createCPFDigits(cpf: string): string {
  let total = 0;
  let tamanho = cpf.length + 1;

  for (const numero of cpf) {
    total += Number(numero) * tamanho;
    tamanho--;
  }

  const digito = 11 - (total % 11);
  return digito <= 9 ? String(digito) : '0';
}

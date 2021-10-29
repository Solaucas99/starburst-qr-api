import genPass from 'generate-password';

export default function createPassword(): string {
  const password = genPass.generate({
    length: 8,
    numbers: true,
    excludeSimilarCharacters: true,
    symbols: false,
  });

  return password;
}

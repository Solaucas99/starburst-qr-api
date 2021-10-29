import genPass from 'generate-password';

export default function createLinkToken(): string {
  const token = genPass.generate({
    length: 25,
    numbers: true,
    excludeSimilarCharacters: true,
    symbols: false,
  });

  return token;
}

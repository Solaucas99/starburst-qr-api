import fs from 'fs';
import { pinoLogger } from '../pino/pinoLogger';

export default function createStaticContentDirectory(
  folderToCreate: string,
): void {
  if (
    !fs.existsSync(
      `${process.env.STATIC_CONTENT_FOLDER as string}/${folderToCreate}`,
    )
  ) {
    fs.mkdir(
      `${process.env.STATIC_CONTENT_FOLDER as string}/${folderToCreate}`,
      (err) => {
        if (err) {
          pinoLogger('fatal', err.message);
          throw err;
        }
      },
    );
  }
}

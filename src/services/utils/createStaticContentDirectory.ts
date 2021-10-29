import fs from 'fs';

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
        if (err) throw err;
      },
    );
  }
}

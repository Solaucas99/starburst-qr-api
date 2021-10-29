import qrcode from 'qrcode';
import { IQRCodeGenerator } from '../IQRCodeGenerator';
import createStaticContentDirectory from '../../../../../services/utils/createStaticContentDirectory';

class GenerateQRCodeImplementation implements IQRCodeGenerator {
  public generate(data: string, visitId: string): string {
    createStaticContentDirectory('qrcodes');

    qrcode.toFile(
      `${process.env.STATIC_CONTENT_FOLDER as string}/qrcodes/${visitId}.png`,
      data,
      (err) => {
        if (err) throw err;
      },
    );

    return `${process.env.BASE_URL as string}/qrcodes/${visitId}.png`;
  }
}

export default new GenerateQRCodeImplementation();

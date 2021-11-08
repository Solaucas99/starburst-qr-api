import nodemailer, { Transporter, SentMessageInfo } from 'nodemailer';
import { IMailProvider, IMessage } from '../IMailProvider';
import config from '../../../../services/dotenv/config';
import { pinoLogger } from '../../../../services/pino/pinoLogger';

class NodemailerProvider implements IMailProvider {
  private mailTransport: Transporter;

  constructor() {
    config();
    this.mailTransport = nodemailer.createTransport({
      host: process.env.MAIL_HOST as string, // hostname
      port: Number(process.env.MAIL_PORT), // port for secure SMTP
      tls: {
        ciphers: 'SSLv3',
      },
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  public async sendMail(message: IMessage): Promise<SentMessageInfo> {
    try {
      const mail = await this.mailTransport.sendMail({
        to: {
          name: message.to.name,
          address: message.to.email,
        },
        from: {
          name: message.from.name,
          address: message.from.email,
        },
        subject: message.subject,
        html: message.body.html,
        text: message.body.text,
      });

      return mail;
    } catch (err: any) {
      pinoLogger('error', err.message);
      throw new Error(err);
    }
  }
}

export default new NodemailerProvider();

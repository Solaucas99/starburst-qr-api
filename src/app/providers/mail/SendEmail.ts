import nodemailer, { Transporter, SentMessageInfo } from 'nodemailer';
import { VisitsProtocol } from '../../../interfaces/VisitsProtocol';
import config from '../../../services/dotenv/config';

class SendEmail {
  private mailTransport: Transporter;
  constructor() {
    config();
    this.mailTransport = nodemailer.createTransport({
      host: process.env.MAIL_HOST as string, // hostname
      port: Number(process.env.MAIL_PORT), // port for secure SMTP
      tls: {
        ciphers: 'SSLv3',
      },
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  public async sendVisitEmail(
    email: string,
    visit: VisitsProtocol,
  ): Promise<SentMessageInfo> {
    try {
      const send: SentMessageInfo = await this.mailTransport.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: `Visita confirmada! - QRCode System`,

        text: `Olá!
        Ficaremos felizes em te receber, aguardamos ansiosamente sua visita.

        Na entrada será necessário mostrar o QR Code abaixo e também informar seu CPF para que seja autorizada a sua entrada.
        Os dados informados acima são indispensáveis para sua autorização, então lembre de levar ambos ok?

        Dados da visita:

        QRCode: ${visit.qrcode}
        Dia: ${new Date(visit.date.toString()).toLocaleDateString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
        })}
        Horário: ${new Date(visit.date.toString()).toLocaleTimeString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
        })}

        Obrigado!
        `,

        html: `<p>Olá!</p><br>

        <p>Ficaremos felizes em te receber, aguardamos ansiosamente sua visita.</p><br>

        <p>Na entrada será necessário mostrar o QR Code abaixo e também informar seu CPF para que seja autorizada a sua entrada.
        Os dados informados acima são indispensáveis para sua autorização, então lembre de levar ambos ok?</p><br>

        <p><b>Dados da visita:</b></p><br>

        <p>QRCode</p><br>

        <p><img src="${visit.qrcode}" height="200" width="200" /></p>

        <p>Dia: <b>${visit.date.toLocaleDateString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
        })}</b></p>
        <p>Horário: <b>${new Date(visit.date.toString()).toLocaleTimeString(
          'pt-BR',
          {
            timeZone: 'America/Sao_Paulo',
          },
        )}</b></p>

        <b>Obrigado!</b>
        `,
      });

      return send;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async sendEmailConfirmation(
    email: string,
    id: string,
    generatedPass: string,
  ): Promise<SentMessageInfo> {
    try {
      const send: SentMessageInfo = await this.mailTransport.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: `Confirme seu Email! - QRCode System`,

        text: `Olá!
        Agradecemos pelo seu cadastro em nosso site, mas ainda falta uma etapa.

        Clique no link abaixo para confirmar seu email e insira a senha enviada também abaixo para finalizar o seu cadastro!

        ${process.env.URL_MAILENDPOINT}/confirmvisitor/${id}

        Sua senha: ${generatedPass}

        Obrigado!
        `,

        html: `<p>Olá!</p><br>

        <p>Agradecemos pelo seu cadastro em nosso site, mas ainda falta uma etapa. Clique no link abaixo para confirmar seu email e finalizar o seu cadastro!</p><br>

        <p><b><a href="${process.env.URL_MAILENDPOINT}/confirmvisitor/${id}">Clique aqui!</a></b></p><br>

        <p>Sua senha: <b>${generatedPass}</b></p><br>

        <b>Obrigado!</b>
        `,
      });

      return send;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new SendEmail();

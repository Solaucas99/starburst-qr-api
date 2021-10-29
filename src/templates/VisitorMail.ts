import { IMessage } from '../app/providers/mail/IMailProvider';

export default function generateVisitorMail(
  destinataryEmail: string,
  destinataryName: string,
  destinataryGeneratedPass: string,
): IMessage {
  return {
    from: {
      email: process.env.MAIL_USER as string,
      name: process.env.NAME_USER as string,
    },
    to: {
      email: destinataryEmail,
      name: destinataryName,
    },
    subject: `Confirme seu Email! - ${process.env.ENTERPRISE_NAME} (Starburst QR)`,
    body: {
      text: `Olá!
      Agradecemos pelo seu cadastro em nosso site, mas ainda falta uma etapa.

      Insira o código abaixo na aba do seu cadastro em nosso site e clique em "Enviar" para verificar o seu e-mail!

      Seu código: ${destinataryGeneratedPass}

      Obrigado!
      `,
      html: `<p>Olá!</p><br>

      <p>Insira o código abaixo na aba do seu cadastro em nosso site e clique em "Enviar" para verificar o seu e-mail!</p><br>

      <p>Seu código: <b>${destinataryGeneratedPass}</b></p><br>

      <b>Obrigado!</b>
      `,
    },
  };
}

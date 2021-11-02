import { IMessage } from '../app/providers/mail/IMailProvider';

export default function generateVisitorMail(
  destinataryEmail: string,
  destinataryBie: string,
  tokenLink: string,
  jwtToken: string,
  linkId: string,
): IMessage {
  return {
    from: {
      email: process.env.MAIL_USER as string,
      name: process.env.NAME_USER as string,
    },
    to: {
      email: destinataryEmail,
      name: destinataryEmail,
    },
    subject: `Cadastre-se! - ${process.env.ENTERPRISE_NAME} (Starburst QR)`,
    body: {
      text: `Olá!

      Um de nossos administradores deseja que você se cadastre e comece a visitar nossa empresa: ${process.env.ENTERPRISE_NAME}.

      Clique no link abaixo para prosseguir com seu cadastro.
      Lembrando que o link irá expirar em 4 dias e quando isso ocorrer você não poderá se cadastrar mais.
      Após o primeiro cadastro você poderá fazer inúmeras visitas, desde que marcadas com os nossos colaboradores.

      ${process.env.URL_MAILENDPOINT}/visitors/register?access=${tokenLink}&generatedId=${linkId}&bie=${destinataryBie}&auth=${jwtToken}

      Obrigado!
      `,
      html: `<p>Olá!</p><br>

      <p>Um de nossos administradores deseja que você se cadastre e comece a visitar nossa empresa: ${process.env.ENTERPRISE_NAME}.</p><br>

      <p>Clique no link abaixo para prosseguir com seu cadastro.</p>
      <p>Lembrando que o link irá expirar em 4 dias e quando isso ocorrer você não poderá se cadastrar mais.</p>
      <p>Após o primeiro cadastro você poderá fazer inúmeras visitas, desde que marcadas com os nossos colaboradores.</p><br>


      <p><b><a href=" ${process.env.URL_MAILENDPOINT}/visitors/register?access=${tokenLink}&generatedId=${linkId}&bie=${destinataryBie}&auth=${jwtToken}">Clique aqui!</a></b></p><br>

      <b>Obrigado!</b>
      `,
    },
  };
}

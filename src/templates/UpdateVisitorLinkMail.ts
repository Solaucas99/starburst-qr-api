import { IMessage } from '../app/providers/mail/IMailProvider';

export default function generateVisitorMail(
  destinataryEmail: string,
  destinataryId: string,
  tokenLink: string,
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
    subject: `Atualize seu cadastro! - ${process.env.ENTERPRISE_NAME} (Starburst QR)`,
    body: {
      text: `Olá!

      Um de nossos administradores deseja que você atualize seus dados de cadastro: ${process.env.ENTERPRISE_NAME}.

      Clique no link abaixo para prosseguir a atualização dos dados.
      Lembrando que o link irá expirar em 4 dias e quando isso ocorrer você não poderá fazer a atualização.

      ${process.env.URL_MAILENDPOINT}/visitors/update?access=${tokenLink}&generatedId=${linkId}&visitorId=${destinataryId}

      Obrigado!
      `,
      html: `<p>Olá!</p><br>

      <p>Um de nossos administradores deseja que você atualize seus dados de cadastro: ${process.env.ENTERPRISE_NAME}.</p><br>

      <p>Clique no link abaixo para prosseguir a atualização dos dados.</p>
      <p> Lembrando que o link irá expirar em 4 dias e quando isso ocorrer você não poderá fazer a atualização.</p>


      <p><b><a href=" ${process.env.URL_MAILENDPOINT}/visitors/update?access=${tokenLink}&generatedId=${linkId}&visitorId=${destinataryId}">Clique aqui!</a></b></p><br>

      <b>Obrigado!</b>
      `,
    },
  };
}

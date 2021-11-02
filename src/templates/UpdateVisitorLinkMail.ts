import { IMessage } from '../app/providers/mail/IMailProvider';

export default function generateVisitorMail(
  destinataryEmail: string,
  destinataryBie: string,
  destinataryId: string,
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
    subject: `Atualize seu cadastro! - ${process.env.ENTERPRISE_NAME} (Starburst QR)`,
    body: {
      text: `Olá!

      Um de nossos administradores deseja que você atualize seus dados de cadastro: ${process.env.ENTERPRISE_NAME}.

      Clique no link abaixo para prosseguir a atualização dos dados.
      Lembrando que o link irá expirar em 4 dias e quando isso ocorrer você não poderá fazer a atualização.

      ${process.env.URL_MAILENDPOINT}/visitors/update?access=${tokenLink}&generatedId=${linkId}&visitorId=${destinataryId}&auth=${jwtToken}&bie=${destinataryBie}

      Obrigado!
      `,
      html: `
      <html>
          <body style="display: flex;align-items: center;justify-content: center;font-family: Verdana, Geneva, Tahoma, sans-serif;font-size: 14px;">
              <div class="background" style="background: url(http://localhost:3000/emailimages/mailbackground.png);background-repeat: no-repeat;background-size: 560px 600px;height: 600px;width: 560px;display: flex;flex-direction: column;justify-content: space-around;align-items: center;">
                  <img src="http://localhost:3000/emailimages/logo.png">
                  <div class="content" style="background: #eeeeee;width: 80%;height: 60%;display: flex;flex-direction: column;justify-content: space-between;align-items: center;padding: 20px;">
                  <h2>Olá visitante! 💼</h2>

                  <p>Um de nossos administradores deseja que você atualize seus dados de cadastro: ${process.env.ENTERPRISE_NAME}.</p><br>
                  <p>Clique no link abaixo para prosseguir a atualização dos dados.</p>
                  <p>Lembrando que o link irá expirar em 4 dias e quando isso ocorrer você não poderá fazer a atualização.</p>

                  <button style="background: #6df5ed;border: none;padding: 10px 20px;font-size: 18px;"><a href="${process.env.URL_MAILENDPOINT}/visitors/update?access=${tokenLink}&generatedId=${linkId}&visitorId=${destinataryId}&auth=${jwtToken}&bie=${destinataryBie}" style="color: #121212;text-decoration: none;">Clique aqui!</a></button>

                  <h3>Obrigado!</h3>
                  </div>
              </div>
          </body>
      </html>
      `,
    },
  };
}

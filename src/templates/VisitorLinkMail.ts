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
      html: `
      <html>
          <body style="display: flex;align-items: center;justify-content: center;font-family: Verdana, Geneva, Tahoma, sans-serif;font-size: 14px;">
              <div class="background" style="background: url(${process.env.BASE_URL}/emailimages/mailbackground.png);background-repeat: no-repeat;background-size: 560px 800px;height: 800px;width: 560px;display: flex;flex-direction: column;justify-content: space-around;align-items: center;">
                  <img src="${process.env.BASE_URL}/emailimages/logo.png">
                  <div class="content" style="background: #eeeeee;width: 80%;height: 60%;display: flex;flex-direction: column;justify-content: space-between;align-items: center;padding: 20px;">
                  <h2>Olá visitante! 💼</h2>
                  <p>Um de nossos administradores deseja que você se cadastre e comece a visitar nossa empresa: ${process.env.ENTERPRISE_NAME}.</p>
                  <p>Clique no link abaixo para prosseguir com seu cadastro.</p>
                  <p>Lembrando que o link irá expirar em 4 dias e quando isso ocorrer você não poderá se cadastrar mais.</p>
                  <p>Após o primeiro cadastro você poderá fazer inúmeras visitas, desde que marcadas com os nossos colaboradores.</p><br>

                  <button style="background: #6df5ed;border: none;padding: 10px 20px;font-size: 18px;"><a href="${process.env.URL_MAILENDPOINT}/visitors/register?access=${tokenLink}&generatedId=${linkId}&bie=${destinataryBie}&auth=${jwtToken}" style="color: #121212;text-decoration: none;">Clique aqui!</a></button>

                  <h3>Obrigado!</h3>
                  </div>
              </div>
          </body>
      </html>
      `,
    },
  };
}

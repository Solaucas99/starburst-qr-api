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
      text: `Olá visitante! 💼

      Insira o código abaixo na aba do seu cadastro em nosso site e clique em "Enviar" para verificar o seu e-mail!

      Seu código: ${destinataryGeneratedPass}

      Obrigado!
      `,
      html: `
      <html>
          <body style="display: flex;align-items: center;justify-content: center;font-family: Verdana, Geneva, Tahoma, sans-serif;font-size: 14px;">
              <div class="background" style="background: url(http://localhost:3000/emailimages/mailbackground.png);background-repeat: no-repeat;background-size: 460px 500px;height: 500px;width: 460px;display: flex;flex-direction: column;justify-content: space-around;align-items: center;">
                  <img src="http://localhost:3000/emailimages/logo.png">
                  <div class="content" style="background: #eeeeee;width: 80%;height: 60%;display: flex;flex-direction: column;justify-content: space-between;align-items: center;padding: 20px;">
                  <h2>Olá visitante! 💼</h2>

                  <p>Insira o código abaixo na aba do seu cadastro em nosso site e clique em "Enviar" para verificar o seu e-mail!</p><br>

                  <p>Seu código: <b>${destinataryGeneratedPass}</b></p><br>

                  <h3>Obrigado!</h3>
                  </div>
              </div>
          </body>
      </html>
      `,
    },
  };
}

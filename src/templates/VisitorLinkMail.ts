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
<head>

</head>

<body style="font-family: Verdana, Geneva, Tahoma, sans-serif;font-size: 14px;margin: 0 auto;">
    <div class="background" style="background: url(${process.env.BASE_URL}/emailimages/mailbackground.png);background-repeat: no-repeat;background-size: 460px 600px;height: 600px;width: 460px;margin: auto;">
        <span>
            <img src="${process.env.BASE_URL}/emailimages/logo.png" style="margin: 0 auto;display: block;width: 50%;padding: 15px;">
        </span>
        <table class="content" style="background: #eeeeee;width: 80%;height: 80%;padding: 20px;border-collapse: collapse;border-spacing: 0;margin: 0 auto;">
        <thead>
            <th>
                Olá visitante! 💼
            </th>
        </thead>

        <tbody>
            <tr>
                <td style="word-break: normal;padding: 10px;"><p>Um de nossos administradores deseja que você se cadastre e comece a visitar nossa empresa: ${process.env.ENTERPRISE_NAME}</p></td>
            </tr>
            <tr>
                <td style="word-break: normal;padding: 10px;"><p>Clique no link abaixo para prosseguir com seu cadastro. <br>
                    Lembrando que o link irá expirar em 4 dias e quando isso ocorrer você não poderá se cadastrar mais.<br>
                    Após o primeiro cadastro você poderá fazer inúmeras visitas, desde que marcadas com os nossos colaboradores.
                </p></td>
            </tr>
            <tr>
                <td style="word-break: normal;padding: 10px;">
                    <button style="background: #6df5ed;border: none;padding: 10px 20px;font-size: 18px;width: 100%;"><a href="${process.env.URL_MAILENDPOINT}/visitors/register?access=${tokenLink}&generatedId=${linkId}&bie=${destinataryBie}&auth=${jwtToken}" style="color: #121212;text-decoration: none;">Clique aqui!</a></button>
                </td>
            </tr>
            <tr>
                <td style="word-break: normal;padding: 10px;"><h3>Obrigado!</h3></td>
            </tr>
        </tbody>
        </table>
    </div>
</body>
</html>


      `,
    },
  };
}

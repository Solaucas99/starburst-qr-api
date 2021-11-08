import { IVisit } from '../app/entities/IVisit';
import { IMessage } from '../app/providers/mail/IMailProvider';

export default function generateVisitMail(
  destinataryEmail: string,
  destinataryName: string,
  destinataryVisit: IVisit,
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
    subject: `Visita confirmada! - ${process.env.ENTERPRISE_NAME} (Starburst QR)`,
    body: {
      text: `Olá!
          Ficaremos felizes em te receber, aguardamos ansiosamente sua visita.

          Na entrada será necessário mostrar o QR Code abaixo e também informar seu CPF para que seja autorizada a sua entrada.
          Os dados informados acima são indispensáveis para sua autorização, então lembre de levar ambos ok?

          Dados da visita:

          QRCode: ${destinataryVisit.qrcode}
          Dia: ${new Date(destinataryVisit.date.toString()).toLocaleDateString(
            'pt-BR',
            {
              timeZone: 'America/Sao_Paulo',
            },
          )}
          Horário: ${new Date(
            destinataryVisit.date.toString(),
          ).toLocaleTimeString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
          })}

          Obrigado!
          `,
      html: `


<html>
<head>

</head>

<body style="font-family: Verdana, Geneva, Tahoma, sans-serif;font-size: 14px;margin: 0 auto;">
    <div class="background" style="background: url(${
      process.env.BASE_URL
    }/emailimages/mailbackground.png);background-repeat: no-repeat;background-size: 660px 1000px;height: 1000px;width: 660px;margin: auto;">
        <span>
            <img src="${
              process.env.BASE_URL
            }/emailimages/logo.png" style="margin: 0 auto;display: block;width: 50%;padding: 15px;">
        </span>
        <table class="content" style="background: #eeeeee;width: 80%;height: 80%;padding: 20px;border-collapse: collapse;border-spacing: 0;margin: 0 auto;">
        <thead>
            <th>
                Olá visitante! 💼
            </th>
        </thead>

        <tbody>
            <tr>
                <td style="word-break: normal;padding: 10px;"><p>Ficaremos felizes em te receber, aguardamos ansiosamente sua visita.</p></td>
            </tr>
            <tr>
                <td style="word-break: normal;padding: 10px;"><p>Na entrada será necessário mostrar o QR Code abaixo e também informar seu CPF para que seja autorizada a sua entrada.
                    Os dados informados acima são indispensáveis para sua autorização, então lembre de levar ambos ok?<br>
                </p></td>
            </tr>
            <tr>
                <td style="word-break: normal;padding: 10px;">
                    <p>Dados da visita:</p><br>
                    <p>QRCode</p>
                    <p><img src="${
                      destinataryVisit.qrcode
                    }" height="200" width="200" style="margin: 0 auto;display: block;width: 50%;padding: 15px;"></p>
                      <a style="color: blue; text-decoration: underline;" href="${
                        destinataryVisit.qrcode
                      }">Clique aqui para acessar a imagem no navegador...</a><br>

                      <p>Dia: <b>${destinataryVisit.date.toLocaleDateString(
                        'pt-BR',
                        {
                          timeZone: 'America/Sao_Paulo',
                        },
                      )}</b></p>
                      <p>Horário: <b>${new Date(
                        destinataryVisit.date.toString(),
                      ).toLocaleTimeString('pt-BR', {
                        timeZone: 'America/Sao_Paulo',
                      })}</b></p>
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

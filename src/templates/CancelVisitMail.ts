import { IVisit } from '../app/entities/IVisit';
import { IMessage } from '../app/providers/mail/IMailProvider';

export default function cancelVisitMail(
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
    subject: `Visita cancelada! - ${process.env.ENTERPRISE_NAME} (Starburst QR)`,
    body: {
      text: `Olá!
          Viemos por esse e-mail informar que a sua visita que estava agendada para o dia ${new Date(
            destinataryVisit.date.toString(),
          ).toLocaleDateString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
          })} foi cancelada!

          Para remarcar entre em contato conosco.

          Obrigado!
          `,
      html: `
<html>
<head>

</head>

<body style="font-family: Verdana, Geneva, Tahoma, sans-serif;font-size: 14px;margin: 0 auto;">
    <div class="background" style="background: url(${
      process.env.BASE_URL
    }/emailimages/mailbackground.png);background-repeat: no-repeat;background-size: 460px 500px;height: 500px;width: 460px;margin: auto;">
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
                <td style="word-break: normal;padding: 10px;"><p> Viemos por esse e-mail informar que a sua visita que estava agendada para o dia ${new Date(
                  destinataryVisit.date.toString(),
                ).toLocaleDateString('pt-BR', {
                  timeZone: 'America/Sao_Paulo',
                })} foi cancelada!
        </p></td>
            </tr>

            <tr>
                <td style="word-break: normal;padding: 10px;">
                   <p>Para remarcar entre em contato conosco.</p>
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

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
          <body style="display: flex;align-items: center;justify-content: center;font-family: Verdana, Geneva, Tahoma, sans-serif;font-size: 14px;">
              <div class="background" style="background: url(${
                process.env.BASE_URL
              }/emailimages/mailbackground.png);background-repeat: no-repeat;background-size: 560px 600px;height: 600px;width: 560px;display: flex;flex-direction: column;justify-content: space-around;align-items: center;">
                  <img src="${process.env.BASE_URL}/emailimages/logo.png">
                  <div class="content" style="background: #eeeeee;width: 80%;height: 60%;display: flex;flex-direction: column;justify-content: space-between;align-items: center;padding: 20px;">
                  <h2>Olá visitante! 💼</h2>

                  <p>Viemos por esse e-mail informar que a sua visita que estava agendada para o dia ${new Date(
                    destinataryVisit.date.toString(),
                  ).toLocaleDateString('pt-BR', {
                    timeZone: 'America/Sao_Paulo',
                  })} foi cancelada!</p><br>

                    <p>Para remarcar entre em contato conosco.</p><br>

                  <h3>Obrigado!</h3>
                  </div>
              </div>
          </body>
      </html>
          `,
    },
  };
}

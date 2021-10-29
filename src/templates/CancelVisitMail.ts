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
      html: `<p>Olá!</p><br>

          <p>Viemos por esse e-mail informar que a sua visita que estava agendada para o dia ${new Date(
            destinataryVisit.date.toString(),
          ).toLocaleDateString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
          })} foi cancelada!</p><br>

          <p>Para remarcar entre em contato conosco.</p><br>

          <b>Obrigado!</b>
          `,
    },
  };
}

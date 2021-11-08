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
          <body style="display: flex;align-items: center;justify-content: center;font-family: Verdana, Geneva, Tahoma, sans-serif;font-size: 14px;">
              <div class="background" style="background: url(${
                process.env.BASE_URL
              }/emailimages/mailbackground.png);background-repeat: no-repeat;background-size: 760px 900px;height: 900px;width: 760px;display: flex;flex-direction: column;justify-content: space-around;align-items: center;">
                  <img src="${process.env.BASE_URL}/emailimages/logo.png">
                  <div class="content" style="background: #eeeeee;width: 80%;height: 80%;display: flex;flex-direction: column;justify-content: space-between;align-items: center;padding: 20px;">
                  <h2>Olá visitante! 💼</h2>

                  <p>Ficaremos felizes em te receber, aguardamos ansiosamente sua visita.</p><br>

                  <p>Na entrada será necessário mostrar o QR Code abaixo e também informar seu CPF para que seja autorizada a sua entrada.
                  Os dados informados acima são indispensáveis para sua autorização, então lembre de levar ambos ok?</p><br>

                  <p><b>Dados da visita:</b></p><br>

                  <p>QRCode</p><br>

                  <p><img src="${
                    destinataryVisit.qrcode
                  }" height="200" width="200"></p>

                  <a style="color: blue; text-decoration: underline;" href="${
                    destinataryVisit.qrcode
                  }">Clique aqui para acessar a imagem no navegador...</a>

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

                  <h3>Obrigado!</h3>
                  </div>
              </div>
          </body>
      </html>
          `,
    },
  };
}

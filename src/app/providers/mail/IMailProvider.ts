interface IAddress {
  email: string;
  name: string;
}

export interface IMessage {
  to: IAddress;
  from: IAddress;
  subject: string;
  body: {
    text: string;
    html: string;
  };
}

export interface IMailProvider {
  //eslint-disable-next-line
  sendMail(message: IMessage): Promise<void | any>;
}

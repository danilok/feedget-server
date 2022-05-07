import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b281f071faec5e",
    pass: "e16f810a85b826"
  }
});

export class NodemailerMailAdapter implements MailAdapter{
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Danilo Yorinori <daniloksy@gmail.com>',
      subject,
      html: body
    });
  }  
}
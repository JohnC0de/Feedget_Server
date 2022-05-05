import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from '../mail-adapter'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'fdd9617b414fc3',
    pass: '7c4ae077741220'
  }
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <mail@feedget.com>',
      to: 'Diego Fernandes <joaocarlos.m015@gmail.com>',
      subject,
      html: body
    })
  }
}

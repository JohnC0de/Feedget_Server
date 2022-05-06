import nodemailer from 'nodemailer'
import 'dotenv/config'
import { env } from 'process'
import { MailAdapter, SendMailData } from '../mail-adapter'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_MAILTRAP_USER,
    pass: process.env.NODEMAILER_MAILTRAP_PASS
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

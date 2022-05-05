import express from 'express'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository'
import { MailAdapter } from './adapters/mail-adapter'
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case'
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter'

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
  //Parameters from the body request
  const { type, comment, screenshot } = req.body

  // Decouple
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()

  // Use-case's
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  )

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })

  return res.status(201).send()
})
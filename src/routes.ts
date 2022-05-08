import express from 'express'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository'
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case'
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter'

export const routes = express.Router()

routes.get('/welcome', (req, { send }) => {
  return send('Welcome! Server is working!')
})

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

  //Run Execute from usecase
  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })

  return res.status(201).send()
})

import express from 'express'

const app = express()

app.post('/feedbacks', (req, res) => {
  return res.send('Hello world')
})

app.listen(3333, () => console.log('Server started on port 3333'))

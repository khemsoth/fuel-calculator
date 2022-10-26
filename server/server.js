const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const PORT = 8000

app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// DUMMY DATA

let users = [
  {
    id: 1,
    email: 'kevhemsoth@gmail.com',
    password: 'password'
  },
  {
    id: 2,
    email: 'sandrashinn10@yahoo.com',
    password: 'truffles'
  }
]

app.get('/', (req, res) => {
  res.send('Hello from server-side')
})

app.get('/users', (req, res) => {
  res.send(users)
})

app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = users.find(user => user.id === id)
  res.send(user)
})

app.listen(PORT)
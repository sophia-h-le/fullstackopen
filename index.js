console.log('Testting server, testing server...')

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

morgan.token('content', function (req, res) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const timestamp = new Date()
    const body = `Phonebook has info for ${persons.length} people <br/> ${timestamp}`
    console.log(body)
    // response.json(body)
    response.send(body)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

app.use(express.json())
const generateId = () => {
    const maxRange = persons.length > 0
    ? persons.length * 100
    : 100
    console.log(maxRange)
    const randomId = Math.floor(Math.random() * maxRange)
    while (persons.some(person => person.id === randomId)) {
        randomId = Math.floor(Math.random() * maxRange)
    }
    console.log(randomId)
    return randomId
}
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// const PORT = 3001
// app.listen(PORT)
// console.log(`SErver running on port ${PORT}`)
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('person', req => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

app.get('/info', async (req, res) => {
  const persons = await Person.find({})
  const date = new Date()

  res.send(`
    <p>Phonebook has info for ${persons.length} ${persons.length === 1 ? 'person' : 'people'}</p>
    <p>${date}</p>
  `)
})

app.get('/api/persons', async (req, res) => {
  const persons = await Person.find({})
  res.json(persons)
})

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id)
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id)
    if (deletedPerson) {
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (error) {
    console.log(error)
    next()
  }
})

app.post('/api/persons', async (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'Name missing'
    })
  }
  
  if (!body.number) {
    return res.status(400).json({
      error: 'Number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  try {
    const savedPerson = await person.save()
    const formattedPerson = savedPerson.toJSON()
    res.json(formattedPerson)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

app.put('/api/persons/:id', async (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true })
    if (updatedPerson) {
      res.json(updatedPerson)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted ID' })
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
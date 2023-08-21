const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Note = require('./models/note')

//  Request logger for each petition to server
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use(express.static('build')) // Uncommend to load frontend from production build

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

// Get note by ID from database endpoint
app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  Note.findById(id)
    .then(note => {
      if(note){
        response.json(note)
      }
      else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Delete note from database endpoint
app.delete('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  Note.findByIdAndRemove(id)
    .then(result => {
      console.log(`Note ID: ${id} has been removed from database`)
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Add note to database endpoint
app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if(!body.content){
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note ({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save()
    .then(savedNote => savedNote.toJSON())
    .then(formattedNote => {
      response.json(formattedNote)
    })
    .catch( error => { next(error) })
})

// Update note on database endpoint

app.put('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const note = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))

})

// Error handler controller for every endpoint
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({ error: 'Malformatted id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// implementation of error handler in app
app.use(errorHandler)
app.use(unknownEndpoint)

// Server PORT listening
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

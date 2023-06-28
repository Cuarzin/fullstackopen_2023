require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const Person = require('./models/person_db')

// app.use(express.static('build')) // uncommend to implement front-end side

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'Unknown endpoint'})
}

app.use(express.json())

app.use(morgan((tokens, req, res) => {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms',
		JSON.stringify(req.body)
	].join(' ')
}))

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
}

app.use(requestLogger)
app.use(cors())

// person route
app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})

// person by ID route
app.get('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	
	Person.findById(id)
	.then(findPerson => {
		findPerson === null && id.length == 24 ? response.json({error:"not found"}) : response.json(findPerson)
	})
	.catch( error => next(error))
})

// info route
app.get('/info', (request, response) => {
	const timestamp = new Date()
	response.send(
			`
				<div>Phonebook has ${Person.length} entries</div>
				<div>${timestamp}</div>
			`
		)
})

// delete entry route
app.delete('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	Person.findByIdAndDelete(id)
	.then(result => {
		console.log(`Person ID: ${id} has been removed from database`)
		response.status(204).end()
	})
	.catch(error => next(error))

	response.status(204).end()
})

// add person to list
app.post('/api/persons', (request, response) => {
	const req = request.body
	if(!request.body){
		return response.status(400).json({ error: 'invalid entry'})
	}
	
	if(req.name == undefined || req.number == undefined){
		return response.status(400).json({ error: 'missing name or number'})
	}

	const newPerson = new Person({
		number: req.number,
		name: req.name
	})

	newPerson.save().then(savedPerson => {
		console.log(`added ${savedPerson.name} to database`)
		response.json(savedPerson)
	})
	
})

// update entry information
app.put('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	const body = request.body

	const updatedInfo = {
		name: body.name,
		number: body.number
	}

	Person.findByIdAndUpdate(id, updatedInfo, { new: true })
	.then(updatedPerson => {
		response.json(updatedPerson)
	})
	.catch(error => next(error))
})

app.use(errorHandler)
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
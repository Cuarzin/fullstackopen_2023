const mongoose = require('mongoose')
const notes = [
  {
  content: "HTML is easy",
  important: true
  },
  {
  content: "Browser can execute only Javascript",
  important: false
  },
  {
  content: "GET and POST are the most important methods of HTTP protocol",
  important: true
  },
  {
  content: "Requested from backend",
  important: true
  }
]

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://chitolsp:${password}@phonebook.kbvcxc9.mongodb.net/notes?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

notes.forEach(noteValue => {
  const note = new Note({
    content: noteValue.content,
    important: noteValue.important,
    date: new Date()
  })
  note.save().then(result => {
    console.log(`${note.content} added`)
  })
})
mongoose.connection.close()
/*
const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
*/
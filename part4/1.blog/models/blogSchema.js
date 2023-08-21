const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const mongoUrl = process.env.MONGODB_URI
console.log('connecting to '+mongoUrl)
mongoose.connect(mongoUrl)
  // eslint-disable-next-line no-unused-vars
  .then(result => {
    console.log('connection to database success')
  })
  .catch(e => {
    console.log('Something wrong happen when connecting to database', e.message)
  })

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
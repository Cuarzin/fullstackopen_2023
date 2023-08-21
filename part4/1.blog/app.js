const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controller/blogs')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to Database')
  })
  .catch(error => {
    logger.error('Error connecting to database', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blog', blogRouter)

module.exports = app
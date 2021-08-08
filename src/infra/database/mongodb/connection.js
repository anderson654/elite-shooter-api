const mongoose = require('mongoose')

mongoose.set('debug', false)
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })

const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const { Schema } = mongoose

const usersSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'The user must have a firstname']
  },
  lastname: {
    type: String,
    required: [true, 'The user must have a lastname']
  },
  username: {
    type: String,
    required: [true, 'The user must have a username']
  },
  email: {
    type: String,
    required: [true, 'The user must have an email']
  },
  password: {
    type: String,
    required: [true, 'The user must have a password']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: [true, 'The user must have a role']
  }
},
{
  timestamps: true
})

usersSchema.plugin(mongooseLeanVirtuals)

const User = mongoose.model('User', usersSchema)

module.exports = User

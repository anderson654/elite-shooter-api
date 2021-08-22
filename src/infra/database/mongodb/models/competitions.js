const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const { Schema } = mongoose

const competitionsSchema = new Schema({
  
  name: {
    type: String,
    required: [true, 'A competition must have a name.']
  },
  users_id: [{
    type: 'ObjectId',
    ref: 'User',
  }]
  ,
  local: {
    type: String,
    required: [true, 'A competition must have a location.']
  },
  punctuation: {
    type: Number,
    required: [true, 'The competition must have a set score.']
  },
  status: {
    type: String,
    enum: ['finished', 'toHappen', 'closed', 'opened'],
    required: [true, 'The status is mandatory.']
  },
  date: {
    type: Date,
    required: [true, 'The competition must have a start date.']
  },
})

competitionsSchema.plugin(mongooseLeanVirtuals)

const Competition = mongoose.model('Competition', competitionsSchema)

module.exports = Competition

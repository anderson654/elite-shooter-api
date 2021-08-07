const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const { Schema } = mongoose

const shotsSchema = new Schema({
  date: {
    required: [true, 'The shoting activity must have a date']
  },
  score: {
    type: Number,
    default: 0
  },
  shootingActivity: {
    type: 'ObjectId',
    ref: 'ShootingActivity',
    required: [true, 'The shot must belong to a shooting activity']
  },
  owner: {
    type: 'ObjectId',
    ref: 'ShootingActivity',
    required: [true, 'The shoting activity must have an owner']
  }
})

shotsSchema.plugin(mongooseLeanVirtuals)

const Shot = mongoose.model('Shot', shotsSchema)

module.exports = Shot

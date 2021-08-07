const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const { Schema } = mongoose

const ShootingActivitiesSchema = new Schema({
  modality: {
    type: String,
    enum: ['competition', 'training'],
    required: [true, 'The shooting activity must have a type']
  },
  score: {
    type: Number,
    default: 0
  },
  gun: {
    type: 'ObjectId',
    ref: 'Gun'
  },
  place: {
    type: 'ObjectId',
    ref: 'Place',
    required: [true, 'The shooting activity must have a place']
  },
  shootingRange: {
    type: 'ObjectId',
    ref: 'ShootingRange',
    required: [true, 'The shooting activity must have a shooting range']
  },
  date: {
    type: 'Date',
    default: Date.now(),
    required: [true, 'The shooting activity must have a date']
  },
  owner: {
    type: 'ObjectId',
    ref: 'User',
    required: [true, 'The shooting activity must have an owner']
  }
})

ShootingActivitiesSchema.plugin(mongooseLeanVirtuals)

const ShootingActivity = mongoose.model('ShootingActivity', ShootingActivitiesSchema)

module.exports = ShootingActivity

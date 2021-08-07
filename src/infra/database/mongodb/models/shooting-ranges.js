const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const { Schema } = mongoose

const shootingRangesSchema = new Schema({
  code: {
    type: String,
    required: [true, 'The shooting range must have a code']
  },
  number: Number,
  type: {
    type: String,
    enum: ['indoor', 'outdoor'],
    required: [true, 'The shooting range must have a type']
  },
  range: Number,
  place: {
    type: 'ObjectId',
    ref: 'Place',
    required: [true, 'The shooting range must have a place']
  },
  sensorEquipment: {
    type: 'ObjectId',
    ref: 'SensorEquipment',
    required: [true, 'The shooting range must have a sensor equipment']
  },
  owner: {
    type: 'ObjectId',
    ref: 'User',
    required: [true, 'The shooting activity must have an owner']
  }
})

shootingRangesSchema.plugin(mongooseLeanVirtuals)

const ShootingRange = mongoose.model('ShootingRange', shootingRangesSchema)

module.exports = ShootingRange

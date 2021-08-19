const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const { Schema } = mongoose

const sensorEquipmentsSchema = new Schema({
  code: {
    type: String,
    required: [true, 'A sensor equipment must have a code']
  },
  type: {
    type: String,
    required: false
  },
  assign: {
    type: 'ObjectId',
    ref: 'ShootingRange',
    required: false
  },
  place: {
    type: 'ObjectId',
    ref: 'Place',
    required: [true, 'A sensor equipment must belong to a place']
  },
  owner: {
    type: 'ObjectId',
    ref: 'User',
    required: [true, 'A sensor equipment must have an owner']
  }
},
{
  timestamps: true
})

sensorEquipmentsSchema.plugin(mongooseLeanVirtuals)

const SensorEquipment = mongoose.model('SensorEquipment', sensorEquipmentsSchema)

export default SensorEquipment

const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const { Schema } = mongoose

const sensorEquipmentsSchema = new Schema({
  code: {
    type: String,
    required: [true, 'A sensor equipment must have a code']
  },
  // type: {
  //   type: String,
  //   required: [true, 'A sensor equipment must have a type']
  // },
  owner: {
    type: 'ObjectId',
    ref: 'User',
    required: [true, 'A sensor equipment must have an owner']
  }
})

sensorEquipmentsSchema.plugin(mongooseLeanVirtuals)

const SensorEquipment = mongoose.model('SensorEquipment', sensorEquipmentsSchema)

module.exports = SensorEquipment

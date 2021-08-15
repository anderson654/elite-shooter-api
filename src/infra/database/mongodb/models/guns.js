const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const { Schema } = mongoose

const gunsSchema = new Schema({
  brand: {
    type: String,
    required: [true, 'A gun must have a brand']
  },
  model: {
    type: String,
    required: [true, 'A gun must have a model']
  },
  type: {
    type: String,
    enum: ['pistol', 'revolver', 'rifle', 'shotgun'],
    required: [true, 'A gun must have a type']
  },
  caliber: String,
  weight: String,
  points: {
    type: Number,
    default: 0
  },
  place: {
    type: 'ObjectId',
    ref: 'Place'
  },
  owner: {
    type: 'ObjectId',
    ref: 'User',
    required: [true, 'A gun must have an owner']
  }
},
{
  timestamps: true
})

gunsSchema.plugin(mongooseLeanVirtuals)

const Gun = mongoose.model('Gun', gunsSchema)

module.exports = Gun

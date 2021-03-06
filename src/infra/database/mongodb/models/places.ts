const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const { Schema } = mongoose

const placesSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A place must have a name']
  },
  street: String,
  neighbourhood: String,
  number: String,
  city: String,
  state: String,
  country: String,
  active: {
    type: Boolean,
    default: true
  },
  owner: {
    type: 'ObjectId',
    ref: 'User',
    required: [true, 'A place must have an owner']
  }
},
{
  timestamps: true
})

placesSchema.plugin(mongooseLeanVirtuals)

const Place = mongoose.model('Place', placesSchema)

export default Place

// const mongoose = require('mongoose')
const Place = require('../../database/mongodb/models/places')

const placesRepository = () => ({

  findAll: async (params) => Place.find(params).exec(),

  findById: async (params) => Place.findOne(params).exec(),

  create: async (params) => (new Place(params)).save()

})

module.exports = placesRepository

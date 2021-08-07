const Gun = require('../../database/mongodb/models/guns')

const gunsRepository = () => ({

  findAll: async (params) => Gun.find(params).lean().exec(),

  findOne: async (params) => Gun.findOne(params).lean().exec(),

  create: async (params) => (new Gun(params)).save(),

  deleteById: async (id) => Gun.deleteOne({ _id: id }).exec()

})

module.exports = gunsRepository

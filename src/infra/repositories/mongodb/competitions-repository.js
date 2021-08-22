const Competitions = require('../../database/mongodb/models/competitions')

const competitionsRepository = () => ({

  findAll: async (params) => Competitions.find(params).lean().exec(),

  findOne: async (params) => Competitions.findOne(params).lean().exec(),

  create: async (params) => (new Competitions(params)).save(),

  deleteById: async (id) => Competitions.deleteOne({ _id: id }).exec(),

})

module.exports = competitionsRepository
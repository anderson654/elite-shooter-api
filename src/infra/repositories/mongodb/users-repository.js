const User = require('../../database/mongodb/models/users')

const usersRepository = () => ({

  findOne: async (params) => (User.findOne(params).exec()),

  create: async (params) => (new User(params)).save()

})

module.exports = usersRepository

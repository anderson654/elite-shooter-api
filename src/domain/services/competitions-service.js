// const ActionForbidden = require('../errors/action-forbidden-error')
const ResourceAlreadyExists = require('../errors/resource-already-exists-error')

const competitionsService = ({ competitionsRepository, sanitizer }) => ({
 
  findAll: async (params) => competitionsRepository.findAll(params),

  create: async (params) => {
    const competitionAlreadyExists = await competitionsRepository.findOne(params)

    if (competitionAlreadyExists) {
      throw new ResourceAlreadyExists('The competition already exists')
    }

    const result = await competitionsRepository.create(params)

    return result
  },

//   delete: async (params) => {
//     const { gunId, owner } = params

//     const gun = await competitionsRepository.findOne({ _id: gunId, owner })

//     if (!gun) {
//       throw new ActionForbidden('The competition doesnt exists or doesnt belong to the user')
//     }

//     const result = await competitionsRepository.deleteById(gun._id)

//     return result
//   }

})

module.exports = competitionsService

const ActionForbidden = require('../errors/action-forbidden-error')
const ResourceAlreadyExists = require('../errors/resource-already-exists-error')

const gunsService = ({ gunsRepository, sanitizer }) => ({

  findAll: async (params) => gunsRepository.findAll(params),

  create: async (params) => {
    const gunAlreadyExists = await gunsRepository.findOne(params)

    if (gunAlreadyExists) {
      throw new ResourceAlreadyExists('The gun already exists')
    }

    const result = await gunsRepository.create(params)

    return result
  },

  delete: async (params) => {
    const { gunId, owner } = params

    const gun = await gunsRepository.findOne({ _id: gunId, owner })

    if (!gun) {
      throw new ActionForbidden('The gun doesnt exists or doesnt belong to the user')
    }

    const result = await gunsRepository.deleteById(gun._id)

    return result
  }

})

module.exports = gunsService

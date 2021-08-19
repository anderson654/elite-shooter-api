const ResourceAlreadyExists = require('../errors/resource-already-exists-error')

const shootingActivitiesService = ({ shootingRangesRepository, sanitizer }) => ({

  findById: async (params) => {
    const { id } = params
    return shootingRangesRepository.findOne({ _id: id })
  },

  findAll: async (params) => shootingRangesRepository.findAll(params),

  create: async (params) => {
    const shootingRangeAlreadyExists = await shootingRangesRepository.findOne(params)

    if (shootingRangeAlreadyExists) {
      throw new ResourceAlreadyExists('The shooting range already exists')
    }

    return shootingRangesRepository.create(params)
  }

})

export default shootingActivitiesService

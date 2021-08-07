const S = require('sanctuary')

const shootingActivitiesService = ({ shootingRangesRepository, sanitizer }) => ({

  findById: async (params) => shootingRangesRepository.findOne(params),

  findAll: async (params) => {
    return shootingRangesRepository.findAll(params)
  },

  create: async (params) => {
    const shootingRange = await shootingRangesRepository.create(params)

    return S.Left(shootingRange.value)
  }

})

module.exports = shootingActivitiesService

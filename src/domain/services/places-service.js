const S = require('sanctuary')

const placesService = ({ placesRepository, sanitizer }) => ({

  findById: async (params) => {
    return placesRepository.findById({ _id: params.id })
  },

  findAll: async (params) => {
    return placesRepository.findAll(params)
  },

  create: async (params) => {
    const { name } = params

    const placeAlreadyExists = await placesRepository.findOne({ name })

    if (placeAlreadyExists.isRight) {
      return placeAlreadyExists
    }

    if (placeAlreadyExists.value) {
      return S.Right('The place is already registered')
    }

    const place = await placesRepository.create(params)

    return S.Left(place.value)
  }

})

module.exports = placesService

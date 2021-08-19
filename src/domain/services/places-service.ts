const placesService = ({ placesRepository }) => ({

  findById: async (params) => {
    return placesRepository.findById({ _id: params.id })
  },

  findAll: async (params) => {
    return placesRepository.findAll(params)
  },

  create: async (params) => {
    const { name } = params

    const placeAlreadyExists = await placesRepository.findOne({ name })

    if (placeAlreadyExists) {
      throw new Error('Place already exsits')
    }

    const place = await placesRepository.create(params)

    return place
  }

})

export default placesService

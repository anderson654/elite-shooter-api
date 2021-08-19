import _ from 'lodash'

const placesController = ({ placesService }) => ({

  findById: async (request) => {
    // const { owner } = request.query
    const { id } = request.params

    // const params = cleanObject({ owner })

    const result = await placesService.findById({ id })

    return {
      code: 200,
      body: result
    }
  },

  findAll: async (request) => {
    const { user } = request.authPayload

    const serviceParams = _.pickBy({
      owner: user.id
    }, _.identity)

    console.log(serviceParams)

    const result = await placesService.findAll(serviceParams)

    return {
      code: 200,
      body: result
    }
  },

  create: async (request) => {
    const { name, ownerId } = request.body
    const params = {
      name,
      owner: ownerId
    }

    const result = await placesService.create(params)

    return {
      code: 200,
      body: result
    }
  }
})

export default placesController

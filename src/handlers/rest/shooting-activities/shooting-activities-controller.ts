import _ from 'lodash'
import {sanitizer} from '../../../utils/sanitizer'

const shootingActivitiesController = ({ shootingActivitiesService }) => ({

  findById: async (request) => {
    const { id } = request.params

    const serviceParams = {
      id,
      populate: ['gun', 'place', 'shootingRange']
    }

    const result = await shootingActivitiesService.findById(serviceParams)

    return {
      code: 200,
      body: result
    }
  },

  findAll: async (request) => {
    const {
      // owner,
      modality,
      year,
      month,
      populate = [],
      limit
    } = request.query

    const serviceParams = sanitizer.cleanObjectDeeply({
      filters: {
        // owner,
        modality,
        year,
        month
      },
      populate,
      limit
    })

    console.log(serviceParams)

    const result = await shootingActivitiesService.findAll(serviceParams)

    return {
      code: 200,
      body: result
    }
  },

  create: async (request) => {
    const { modality, shootingRangeId, ownerId, gunId, placeId } = request.body

    const params = {
      owner: ownerId,
      modality,
      shootingRange: shootingRangeId,
      gun: gunId,
      place: placeId
    }

    const result = await shootingActivitiesService.create(params)

    return {
      code: 200,
      body: result
    }
  }
})

export default shootingActivitiesController

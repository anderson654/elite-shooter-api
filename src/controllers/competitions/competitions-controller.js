const { cleanObject } = require('../../helper/object')
const competitionsController = ({ competitionsService }) => ({

  findCompetitionsByUserId: async (request) => {
    const { userId } = request.params

    const serviceParams = {
      usersId: userId,
    }
 
    const result = await competitionsService.findAll(serviceParams)

    return {
      code: 200,
      body: result
    }
  },

  findAll: async (request) => {

    const { local, status } = request.query

    
    const serviceParams = cleanObject({ filters:{
      local, status }
    })

    result = await competitionsService.findAll(serviceParams)
    

      return {
        code: 200,
        body: result
      }
    },

  create: async (request) => {

    const { usersId, local, name, score, status, date } = request.body

    const params = { usersId, local, name, score, status, date }

    const result = await competitionsService.create(params)

    return {
      code:200,
      body: result
    }
  }
})
  
  module.exports = competitionsController
const competitionsController = ({ competitionsService }) => ({

  findCompetitionsByUserId: async (request) => {
    const { user_id } = request.params

    const serviceParams = {
      users_id: user_id,
    }
 
    const result = await competitionsService.findAll( serviceParams )

    return {
      code: 200,
      body: result
    }
  },

  findAll: async (request) => {

    const { local, status } = request.query

    const serviceParams = {
      local: local,
      status: status
    }

    let result;
    if(serviceParams.local && serviceParams.status != ''){
      result = await competitionsService.findAll(serviceParams)
    }else{
      result = await competitionsService.findAll({})
    }

      return {
        code: 200,
        body: result
      }
    },

  findLocalAndStatus:async (request) => {
    const { local, status } = request.query

    const serviceParams = {
      local: local,
      status: status
    }
    const result = await competitionsService.findAll(serviceParams)

      return {
        code: 200,
        body: local
      }
    },

  create: async (request) => {

    const { users_id, local, name, punctuation, status, date } = request.body

    const params = { users_id, local, name, punctuation, status, date }

    const result = await competitionsService.create(params)

    return {
      code:200,
      body: result
    }
  }
})
  
  module.exports = competitionsController
const gunsController = ({ usersService }) => ({

  create: async (request) => {
    const { firstname, lastname, username, email, password } = request.body

    const params = { firstname, lastname, username, email, password }

    const result = await usersService.create(params)

    return {
      code: 200,
      body: result.value
    }
  },

  find: async (request) => {
    const { username } = request.query

    const params = { username }

    const result = await usersService.findByUsername(params)

    return {
      code:200,
      body: result
    }
  }
})

module.exports = gunsController

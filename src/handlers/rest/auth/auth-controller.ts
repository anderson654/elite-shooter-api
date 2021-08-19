
const authController = ({ authService }) => ({

  signin: async (request) => {
    const { username, password } = request.body

    const serviceParams = { username, password }

    const result = await authService.signin(serviceParams)

    return {
      code: 200,
      body: result
    }
  }
})

export default authController

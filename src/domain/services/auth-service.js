const authService = ({
  usersRepository,
  auth
}) => ({

  signin: async (params) => {
    const user = await usersRepository.findOne(params)

    if (!user) {
      throw new Error('User doesnt exists')
    }

    const { _id: id, role } = user

    return {
      token: auth.sign({ userId: id, role }),
      role
    }
  }

})

module.exports = authService

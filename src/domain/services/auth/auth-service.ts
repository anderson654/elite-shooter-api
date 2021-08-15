import { SigninParams } from "./types/signin"

const authService = ({
  usersRepository,
  auth
}: any) => ({

  signin: async (params: SigninParams) => {
    const user = await usersRepository.findOne(params)

    if (!user) {
      throw new Error('User doesnt exists')
    }

    const { _id, role } = user

    return {
      token: auth.sign({ userId: _id, role }),
      _id,
      role
    }
  }

})

module.exports = authService

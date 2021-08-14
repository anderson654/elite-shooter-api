const { validateEmail } = require('../../helper/object-validator')

const usersService = ({ usersRepository, passwordEncrypter, sanitizer }) => ({

  create: async (params) => {
    const isEmailValid = validateEmail(params.email)

    if (!isEmailValid) {
      throw new Error('It should have a valid email')
    }

    const userWithCurrentEmailAlreadyExists = await usersRepository.findOne({ email: params.email })

    if (userWithCurrentEmailAlreadyExists) {
      throw new Error('The email is already in use')
    }

    const userWithCurrentUsernameAlreadyExists = await usersRepository.findOne({ username: params.username })

    if (userWithCurrentUsernameAlreadyExists) {
      throw new Error('The username is already in use')
    }

    const passwordHash = passwordEncrypter.encrypt(params.password)

    const newUser = {
      ...params,
      role: 'user',
      password: passwordHash
    }

    const user = await usersRepository.create(newUser)

    return user
  }

})

module.exports = usersService

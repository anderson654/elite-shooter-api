const S = require('sanctuary')
const { validateEmail } = require('../../helper/object-validator')

const usersService = ({ usersRepository, passwordEncrypter, sanitizer }) => ({

  create: async (params) => {
    const isEmailValid = validateEmail(params.email)

    if (!isEmailValid) {
      return S.Right('It should have a valid email')
    }

    const userWithCurrentEmailAlreadyExists = await usersRepository.findOne({ email: params.email })

    if (userWithCurrentEmailAlreadyExists) {
      return S.Right('The email is already in use')
    }

    const userWithCurrentUsernameAlreadyExists = await usersRepository.findOne({ username: params.username })

    if (userWithCurrentUsernameAlreadyExists) {
      return S.Right('The username is already in use')
    }

    const passwordHash = passwordEncrypter.encrypt(params.password)

    const newUser = {
      ...params,
      role: 'user',
      password: passwordHash
    }

    const user = await usersRepository.create(newUser)

    return S.Left(user.value)
  },

  //criar metodo findByUsername usar o de cima como exemplo
  findByUsername: async (params) => {
    console.warn(params.username)


    const user = await usersRepository.findOne({ username: params.username })
    return user
  }
 
})

module.exports = usersService

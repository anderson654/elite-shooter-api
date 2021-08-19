
const bcrypt = require('bcrypt')

const encrypt = (plainPassword) => {
  const salt = bcrypt.genSaltSync(12)
  const hash = bcrypt.hashSync(plainPassword, salt)
  return hash
}

const compare = (plainPassword, hashPassword) => {
  return bcrypt.compareSync(plainPassword, hashPassword)
}

const passwordEncrypter = () => ({
  encrypt,
  compare
})

export default passwordEncrypter

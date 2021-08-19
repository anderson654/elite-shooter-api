const jwt = require('jsonwebtoken')

const SECRET = 'SECRET'

const sign = ({ userId, role }) => jwt.sign({
  user: {
    id: userId,
    role
  }
}, SECRET, { expiresIn: '1d' })

const decode = (token) => jwt.verify(token, SECRET)

const auth = () => ({
  sign,
  decode
})

export default auth

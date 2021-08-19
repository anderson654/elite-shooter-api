const NotAuthenticated = require('../domain/errors/not-authenticated-error')
const auth = require('../infra/adapters/auth')

const handleAuthorization = ({ headers }) => {
  const { authorization } = headers

  if (!authorization) {
    throw new NotAuthenticated('Request without token')
  }

  const [, token] = authorization.split(' ')

  return auth().decode(token)
}

export default handleAuthorization

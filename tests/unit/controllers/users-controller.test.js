const usersController = require('../../../src/controllers/users-controller')
const { requestMock } = require('../../utils/controller-mocks')

describe('Users controller', () => {
  describe('POST - /api/users', () => {
    test('Should return 400 code when body data is incomplete', async () => {
      const request = requestMock()

      const requestsBody = [
        {
          lastname: 'lastname',
          username: 'username',
          email: 'test@hotmail.com',
          password: '123456'
        },
        {
          firstname: 'firstname',
          username: 'username',
          email: 'test@hotmail.com',
          password: '123456'
        },
        {
          firstname: 'firstname',
          lastname: 'lastname',
          email: 'test@hotmail.com',
          password: '123456'
        },
        {
          firstname: 'firstname',
          lastname: 'lastname',
          username: 'username',
          password: '123456'
        },
        {
          firstname: 'firstname',
          lastname: 'lastname',
          username: 'username',
          email: 'test@hotmail.com'
        }
      ]

      const containerMock = {
        usersService: {
          create: jest.fn().mockReturnValue({})
        }
      }

      const controller = usersController(containerMock)

      requestsBody.forEach(async body => {
        request.body = body
        const response = await controller.create(request)
        expect(response.code).toBe(400)
        expect(response.body).not.toBeNull()
      })
    })
  })
})

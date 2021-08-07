const S = require('sanctuary')

const shootingActivitiesController = require('../../../src/controllers/shooting-activities-controller')
const { requestMock } = require('../../utils/controller-mocks')

describe('Activities controller', () => {
  describe('GET - /api/shooting-activities', () => {
    test('Should return 200 code and body with result when find data', async () => {
      const request = requestMock()

      const dbResult = [
        {
          id: 1,
          name: 'test'
        },
        {
          id: 2,
          name: 'test2'
        }
      ]

      const containerMock = {
        shootingActivitiesService: {
          findAll: jest.fn().mockReturnValue(Promise.resolve(S.Left(dbResult)))
        }
      }

      const response = await shootingActivitiesController(containerMock).findAll(request)

      expect(response.code).toBe(200)
      expect(response.body).toBe(dbResult)
    })

    test('Should return 200 code and body with empty array when doesnt find data', async () => {
      const request = requestMock()

      const dbResult = []

      const containerMock = {
        shootingActivitiesService: {
          findAll: jest.fn().mockReturnValue(Promise.resolve(S.Left(dbResult)))
        }
      }

      const response = await shootingActivitiesController(containerMock).findAll(request)

      expect(response.code).toBe(200)
      expect(response.body).toStrictEqual(dbResult)
    })

    test('Should return 500 code when right err occorr', async () => {
      const request = requestMock()

      const dbResult = 'Some error occurred'

      const containerMock = {
        shootingActivitiesService: {
          findAll: jest.fn().mockReturnValue(Promise.resolve(S.Right(dbResult)))
        }
      }

      const response = await shootingActivitiesController(containerMock).findAll(request)

      expect(response.code).toBe(500)
      expect(response.body).toBe(dbResult)
    })
  })

  describe('POST - /api/shooting-activities', () => {
    test('Should return 204 code and body with result when create a new activity data', async () => {
      const request = requestMock()
      request.body = {
        type: 'training',
        equipmentId: 'id',
        gun: {
          id: 'id',
          ownerType: 'user'
        }
      }

      const dbResult = [
        {
          id: 1,
          name: 'test'
        },
        {
          id: 2,
          name: 'test2'
        }
      ]

      const containerMock = {
        shootingActivitiesService: {
          findAll: jest.fn().mockReturnValue(Promise.resolve(S.Left(dbResult)))
        }
      }

      const response = await shootingActivitiesController(containerMock).findAll(request)

      expect(response.code).toBe(200)
      expect(response.body).toBe(dbResult)
    })

    test('Should return 400 code when body data is incomplete', async () => {
      const request = requestMock()

      const requestsBody = [
        {
          equipmentId: 'objectId',
          gun: {
            id: 'objectId',
            ownerType: 'user'
          }
        },
        {
          type: 'training',
          gun: {
            id: 'objectId',
            ownerType: 'user'
          }
        },
        {
          type: 'training',
          equipmentId: 'objectId'
        },
        {
          type: 'training',
          gun: {
            ownerType: 'user'
          }
        },
        {
          type: 'training',
          gun: {
            id: 'objectId'
          }
        }
      ]

      const containerMock = {
        shootingActivitiesService: {
          create: jest.fn().mockReturnValue({})
        }
      }

      const controller = shootingActivitiesController(containerMock)

      requestsBody.forEach(async body => {
        request.body = body
        const response = await controller.create(request)
        expect(response.code).toBe(400)
        expect(response.body).not.toBeNull()
      })
    })
  })
})

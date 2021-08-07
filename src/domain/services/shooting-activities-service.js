const S = require('sanctuary')

const shootingActivitiesService = ({ shootingActivitiesRepository, sanitizer }) => ({

  findById: async ({ id }) => {
    const shootingActivity = await shootingActivitiesRepository.findById(id)

    const result = {
      ...shootingActivity,
      date: sanitizer.formatDate(shootingActivity.date, 'dd/MM/yyyy')
    }

    return result
  },

  findAll: async (params) => {
    const shootingActivities = await shootingActivitiesRepository.findAll(params)

    const result = shootingActivities.map(shootingActivity => ({
      ...shootingActivity,
      date: sanitizer.formatDate(shootingActivity.date, 'dd/MM/yyyy')
    }))

    return result
  },

  create: async (params) => {
    const queryOpenShootingActivity = {
      owner: params.owner,
      isOpen: 1
    }

    const userHaveAnOpenActivity = await shootingActivitiesRepository.findOne(queryOpenShootingActivity)

    if (userHaveAnOpenActivity.isRight) {
      return userHaveAnOpenActivity
    }

    if (userHaveAnOpenActivity.value) {
      return S.Right('It should close the open shooting activity before start another')
    }

    const shootingActivity = await shootingActivitiesRepository.create(params)

    if (shootingActivity.isRight) {
      return shootingActivity
    }

    return S.Left(shootingActivity.value)
  }

})

module.exports = shootingActivitiesService

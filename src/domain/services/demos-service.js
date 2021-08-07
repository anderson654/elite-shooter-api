const faker = require('faker')

const demosService = ({
  usersRepository,
  placesRepository,
  gunsRepository,
  shootingRangesRepository,
  sensorEquipmentsRepository,
  shootingActivitiesRepository
}) => ({

  create: async (params) => {
    const demoAdminUser = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: '123456',
      role: 'admin'
    }

    const adminUser = await usersRepository.create(demoAdminUser)

    const create5 = new Array(5).fill(5)
    const users = []

    for (const _ of create5) {
      const demoUser = {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: '123456',
        role: 'user'
      }

      const user = await usersRepository.create(demoUser)

      users.push(user)
    }

    const guns = []

    const create2 = new Array(2).fill(2)

    for (const user of users) {
      for (const _ of create2) {
        const gunDemo = {
          brand: faker.vehicle.vehicle(),
          model: faker.vehicle.vehicle(),
          type: 'pistol',
          owner: user._id
        }

        const gun = await gunsRepository.create(gunDemo)
        guns.push(gun)
      }
    }

    const places = []

    for (const _ of create2) {
      const demoPlace = {
        name: faker.company.companyName(),
        owner: adminUser._id
      }
      const place = await placesRepository.create(demoPlace)
      places.push(place)
    }

    const create4 = new Array(4).fill(4)
    const shootingRanges = []
    const sensorEquipments = []

    for (const place of places) {
      for (const [index] of create4.entries()) {
        const sensorEquipmentDemo = {
          code: faker.address.countryCode(),
          owner: adminUser._id
        }

        const sensorEquipment = await sensorEquipmentsRepository.create(sensorEquipmentDemo)

        sensorEquipments.push(sensorEquipment)

        const shootingRangeDemo = {
          code: faker.address.countryCode(),
          type: index % 2 <= 0 ? 'indoor' : 'outdoor',
          owner: adminUser._id,
          place: place._id,
          sensorEquipment: sensorEquipment._id
        }

        const shootingRange = await shootingRangesRepository.create(shootingRangeDemo)

        shootingRanges.push(shootingRange)
      }
    }

    const create20 = new Array(20).fill(20)
    const shootingActivities = []

    for (const user of users) {
      for (const shootingRange of shootingRanges) {
        for (const [index] of create20.entries()) {
          const randomPlaceIndex = Math.floor(Math.random() * (shootingRanges.length - 1))
          const randomGunIndex = Math.floor(Math.random() * (guns.length - 1))

          const shootingActivityDemo = {
            date: faker.date.between(new Date('01/01/2020'), new Date()),
            modality: index % 2 <= 0 ? 'training' : 'competition',
            shootingRange: shootingRange._id,
            place: shootingRanges[randomPlaceIndex].place._id,
            gun: guns[randomGunIndex]._id,
            owner: user._id
          }

          const shootingActivity = await shootingActivitiesRepository.create(shootingActivityDemo)
          shootingActivities.push(shootingActivity)
        }
      }
    }
  }

})

module.exports = demosService

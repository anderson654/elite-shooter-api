const { createContainer, InjectionMode } = require('awilix')

const container = createContainer()

// const resolveUserRepository = () => {
//   if (process.env.NODE_ENV === 'test') {
//     console.log('resolveUserRepository')
//     return userRepositoryMongo
//   }

//   return userRepositorySQL
// }

container.register({
  // userRepository: asFunction(resolveUserRepository())
  // shootingActivitiesService: asValue(() => ({
  //   findAll: async () => {
  //     console.log('teste 11111111')
  //     return S.Left([1, 2, 3, 4])
  //   }
  // }))
})

// to configure lifetime for all modules loaded..
container.loadModules([
  './src/controllers/**/*.js',
  './src/domain/**/*.js',
  './src/infra/repositories/**/*.js',
  './src/infra/adapters/*.js'
], {
  // cwd: __dirname,
  resolverOptions: {
    injectionMode: InjectionMode.PROXY
  },
  formatName: 'camelCase'
})

module.exports = container
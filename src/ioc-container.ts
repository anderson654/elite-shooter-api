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
  './handlers/**/*.js',
  './handlers/**/*.ts',
  './domain/**/*.js',
  './domain/**/*.ts',
  './infra/repositories/**/*.js',
  './infra/repositories/**/*.ts',
  './infra/adapters/*.js',
  './infra/adapters/*.ts'
], {
  cwd: __dirname,
  resolverOptions: {
    injectionMode: InjectionMode.PROXY
  },
  formatName: 'camelCase'
})

export default container

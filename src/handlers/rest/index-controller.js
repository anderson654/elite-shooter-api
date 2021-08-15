
const indexController = () => ({
  index: async (request, reply) => {
    return {
      code: 200,
      body: {
        hello: 'world'
      }
    }
  }
})

module.exports = indexController

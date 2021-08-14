
const demosController = ({ demosService }) => ({

  create: async (request) => {
    await demosService.create()

    return {
      code: 204
    }
  }
})

module.exports = demosController

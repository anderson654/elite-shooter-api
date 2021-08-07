
const demosController = ({ demosService }) => ({

  create: async (request) => {
    const result = await demosService.create()

    return {
      code: 204
    }
  }
})

module.exports = demosController

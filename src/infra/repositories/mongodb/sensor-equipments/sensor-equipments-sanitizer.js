const _ = require('lodash')

const sensorEquipmentsSanitizer = () => ({
  findAll: (params) => _.pickBy(({
    ...params,
    assign: _.hasIn(params, 'assign') && { $exists: _.get(params, 'assign') }
  }), _.identity)
})

module.exports = sensorEquipmentsSanitizer

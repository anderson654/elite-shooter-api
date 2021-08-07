// const _ = require('lodash')
const { cleaner } = require('lodash-clean')

const cleanObject = obj => cleaner(obj)

module.exports = {
  cleanObject
}

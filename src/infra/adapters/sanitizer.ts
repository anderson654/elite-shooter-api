const DateFNS = require('date-fns')

const formatDate = (date, format) => DateFNS.format(date, format)

const sanitizer = () => ({
  formatDate
})

export default sanitizer

class ResourceAlreadyExists extends Error {
  constructor (message) {
    super(message)
    this.name = 'ResourceAlreadyExists'
  }
}

module.exports = ResourceAlreadyExists

class ActionForbidden extends Error {
  constructor (message) {
    super(message)
    this.name = 'ActionForbidden'
  }
}

module.exports = ActionForbidden

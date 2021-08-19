class ActionForbidden extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ActionForbidden'
  }
}

export default ActionForbidden

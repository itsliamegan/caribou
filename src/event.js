export class Event {
  constructor(payload) {
    this.payload = payload
  }

  get type() {
    return this.constructor
  }
}

export class StubSubject {
  constructor(object, descriptor = object) {
    this.object = object
    this.descriptor = descriptor
    this.originals = new Map()
  }

  wrap(property, value) {
    this.remember_original(property)
    this.object[property] = value
  }

  unwrap(name) {
    this.reset_to_original(name)
    this.forget_original(name)
  }

  remember_original(property) {
    this.originals.set(property, this.object[property])
  }

  reset_to_original(property) {
    delete this.object[property]
    this.object[property] = this.originals.get(property)
  }

  forget_original(property) {
    this.originals.delete(property)
  }

  toString() {
    return this.descriptor
  }
}

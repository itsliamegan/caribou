import { Suite } from "./suite"

export class Instantiator {
  constructor(bus, classes) {
    this.bus = bus
    this.classes = classes
  }

  get suite() {
    let suite = new Suite(this.bus)

    for (let test of this.tests) {
      suite.register(test)
    }

    return suite
  }

  get tests() {
    return this.classes.map(klass => new klass(this.bus))
  }
}

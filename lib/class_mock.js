import { InstanceMock } from "./instance_mock"

export class ClassMock extends InstanceMock {
  constructor(klass) {
    super(klass.name)

    this.klass = klass
    this.originals = {}
  }

  verify() {
    try {
      super.verify()
    } finally {
      this.reset()
    }
  }

  reset() {
    for (let [key, value] of Object.entries(this.originals)) {
      this.klass[key] = value
    }
  }

  stub_property(property, value) {
    if (!this.has_remembered_original(property)) {
      this.remember_original(property)
    }

    this.klass[property] = value
  }

  remember_original(property) {
    this.originals[property] = this.klass[property]
  }

  has_remembered_original(property) {
    return property in this.originals
  }
}

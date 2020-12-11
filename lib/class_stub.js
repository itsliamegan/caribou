import { InstanceStub } from "./instance_stub"

export class ClassStub extends InstanceStub {
  constructor(klass) {
    super(klass.name)

    this.klass = klass
    this.originals = {}
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

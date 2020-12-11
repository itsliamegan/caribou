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

  stubProperty(property, value) {
    if (!this.rememberedOriginal(property)) {
      this.rememberOriginal(property)
    }

    this.klass[property] = value
  }

  rememberOriginal(property) {
    this.originals[property] = this.klass[property]
  }

  rememberedOriginal(property) {
    return property in this.originals
  }
}

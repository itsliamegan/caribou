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

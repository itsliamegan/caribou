export class PropertyDefinition {
  constructor(property, value) {
    this.property = property
    this.value = value
  }

  define_on(subject) {
    subject.wrap(this.property, this.value)
  }

  undefine_on(subject) {
    subject.unwrap(this.property)
  }

  matches(args) {
    return false
  }
}

import { StubSubject } from "./stub_subject"
import { PropertyDefinition } from "./property_definition"
import { MethodDefinition } from "./method_definition"

export class Stub {
  constructor(descriptor, subject = this) {
    this.descriptor = descriptor
    this.subject = new StubSubject(subject, descriptor)
    this.definitions = []
  }

  get stubs() {
    return new StubTypeDelegate(this)
  }

  reset() {
    for (let definition of this.definitions) {
      definition.undefine_on(this.subject)
    }
  }

  add_definition(definition) {
    this.definitions.push(definition)
    definition.define_on(this.subject)
  }

  matching_definition_for(args) {
    return this.definitions.find(definition => definition.matches(args))
  }

  has_matching_definition_for(args) {
    return this.matching_definition_for(args) != undefined
  }

  call_matching_definition_for(args) {
    return this.matching_definition_for(args).call(args)
  }

  toString() {
    return this.descriptor
  }
}

class StubTypeDelegate {
  constructor(stub) {
    this.stub = stub
  }

  property(property) {
    return new PropertyDefinitionDelegate(this.stub, property)
  }

  method(method) {
    return new MethodDefinitionDelegate(this.stub, method)
  }
}

class PropertyDefinitionDelegate {
  constructor(stub, property) {
    this.stub = stub
    this.property = property
  }

  value(value) {
    this.stub.add_definition(
      new PropertyDefinition(this.property, value)
    )
  }
}

class MethodDefinitionDelegate {
  constructor(stub, method) {
    this.definition = new MethodDefinition(stub, method)

    stub.add_definition(this.definition)
  }

  with(...args) {
    this.definition.required_args = args

    return this
  }

  returns(value) {
    this.definition.return_value = value
  }
}

export class InstanceStub {
  constructor(name) {
    this.name = name
  }

  get stubs() {
    return new TypeDelegate(this)
  }

  toString() {
    return `stub("${this.name}")`
  }

  stub_property(property, value) {
    this[property] = value
  }

  stub_method(method, value) {
    // Dynamically name the function via an object property so the name can
    // appear in debuggers.
    let fn = { [method]: () => value }[method]

    this.stub_property(method, fn)
  }
}

class TypeDelegate {
  constructor(stub) {
    this.stub = stub
  }

  property(property) {
    this.stub.stub_property(property, undefined)

    return new PropertyValueDelegate(this.stub, property)
  }

  method(method) {
    this.stub.stub_method(method, undefined)

    return new MethodReturnDelegate(this.stub, method)
  }
}

class PropertyValueDelegate {
  constructor(stub, property) {
    this.stub = stub
    this.property = property
  }

  value(value) {
    this.stub.stub_property(this.property, value)
  }
}

class MethodReturnDelegate {
  constructor(stub, method) {
    this.stub = stub
    this.method = method
  }

  returns(value) {
    this.stub.stub_method(this.method, value)
  }
}

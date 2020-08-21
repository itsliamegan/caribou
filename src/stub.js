export class Stub {
  constructor(name) {
    this.name = name
  }

  get stubs() {
    return new TypeDelegate(this)
  }

  stubProperty(property, value) {
    this[property] = value
  }

  stubMethod(method, value) {
    // Dynamically name the function via an object property so the name can
    // appear in debuggers.
    let fn = { [method]: () => value }[method]

    this.stubProperty(method, fn)
  }
}

export function stub(name) {
  return new Stub(name)
}

class TypeDelegate {
  constructor(stub) {
    this.stub = stub
  }

  property(property) {
    this.stub.stubProperty(property, undefined)

    return new PropertyValueDelegate(this.stub, property)
  }

  method(method) {
    this.stub.stubMethod(method, undefined)

    return new MethodReturnDelegate(this.stub, method)
  }
}

class PropertyValueDelegate {
  constructor(stub, property) {
    this.stub = stub
    this.property = property
  }

  value(value) {
    this.stub.stubProperty(this.property, value)
  }
}

class MethodReturnDelegate {
  constructor(stub, method) {
    this.stub = stub
    this.method = method
  }

  returns(value) {
    this.stub.stubMethod(this.method, value)
  }
}

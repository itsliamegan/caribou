import { TestCase } from "contend"
import { assert_equal, assert_undefined } from "contend/assertions"
import { Stub } from "../lib/stub"

export class StubTest extends TestCase {
  "test stubs property values"() {
    let stub = new Stub("stub")
    stub.stubs.property("property").value("value")

    assert_equal("value", stub.property)
  }

  "test stubs method return values"() {
    let stub = new Stub("stub")
    stub.stubs.method("method").returns("value")

    assert_equal("value", stub.method())
  }

  "test stubs method return values only for specific arguments"() {
    let stub = new Stub("stub")
    stub.stubs.method("method").with("arg").returns("value")

    assert_equal("value", stub.method("arg"))
    assert_undefined(stub.method())
  }

  "test stubs properties and methods on an arbitrary object"() {
    let subject = {}

    let stub = new Stub("stub", subject)
    stub.stubs.property("property").value("value")
    stub.stubs.method("method").returns("value")

    assert_equal("value", subject.property)
    assert_equal("value", subject.method())
    assert_undefined(stub.property)
    assert_undefined(stub.method)
  }

  "test resets stubbed properties and methods"() {
    let stub = new Stub("stub")
    stub.stubs.property("property").value("value")
    stub.stubs.method("method").returns("value")
    stub.reset()

    assert_undefined(stub.property)
    assert_undefined(stub.method)
  }
}

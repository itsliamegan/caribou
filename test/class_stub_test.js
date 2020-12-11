import { TestCase } from ".."
import { ClassStub } from "../lib/class_stub"

export class ClassStubTest extends TestCase {
  "test stubbing properties"() {
    class ExampleClass { }
    let stub = new ClassStub(ExampleClass)

    stub.stubs.property("property").value("value")

    this.assert_equal("value", ExampleClass.property)
  }

  "test stubbing methods"() {
    class ExampleClass { }
    let stub = new ClassStub(ExampleClass)

    stub.stubs.method("method").returns("value")

    this.assert_equal("value", ExampleClass.method())
  }

  "test resetting stubbed methods"() {
    class ExampleClass {
      static method() { return "original" }
    }
    let stub = new ClassStub(ExampleClass)

    stub.stubs.method("method").returns("stubbed")
    stub.reset()

    this.assert_equal("original", ExampleClass.method())
  }
}

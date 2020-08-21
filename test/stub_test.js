import { TestCase } from ".."
import { Stub } from "../src/stub"

export class StubTest extends TestCase {
  "test stubbing properties"() {
    let stub = new Stub("stub")

    stub.stubs.property("property").value("value")

    this.assertEqual("value", stub.property)
  }

  "test stubbing methods"() {
    let stub = new Stub("stub")

    stub.stubs.method("method").returns("value")

    this.assertEqual("value", stub.method())
  }
}

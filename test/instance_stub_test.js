import { TestCase } from "../lib"
import { InstanceStub } from "../lib/instance_stub"

export class InstanceStubTest extends TestCase {
  "test stubbing properties"() {
    let stub = new InstanceStub("stub")

    stub.stubs.property("property").value("value")

    this.assertEqual("value", stub.property)
  }

  "test stubbing methods"() {
    let stub = new InstanceStub("stub")

    stub.stubs.method("method").returns("value")

    this.assertEqual("value", stub.method())
  }
}

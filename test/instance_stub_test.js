import { TestCase } from ".."
import { InstanceStub } from "../lib/instance_stub"

export class InstanceStubTest extends TestCase {
  "test stubbing properties"() {
    let stub = new InstanceStub("stub")

    stub.stubs.property("property").value("value")

    this.assert_equal("value", stub.property)
  }

  "test stubbing methods"() {
    let stub = new InstanceStub("stub")

    stub.stubs.method("method").returns("value")

    this.assert_equal("value", stub.method())
  }
}

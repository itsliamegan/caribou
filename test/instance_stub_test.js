import { TestCase } from ".."
import { assert_equal } from "../lib/assertions"
import { InstanceStub } from "../lib/instance_stub"

export class InstanceStubTest extends TestCase {
  "test stubbing properties"() {
    let stub = new InstanceStub("stub")

    stub.stubs.property("property").value("value")

    assert_equal("value", stub.property)
  }

  "test stubbing methods"() {
    let stub = new InstanceStub("stub")

    stub.stubs.method("method").returns("value")

    assert_equal("value", stub.method())
  }
}

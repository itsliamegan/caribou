import { TestCase, stub } from ".."
import { Invocation } from "../src/invocation"

export class InvocationTest extends TestCase {
  "test matches"() {
    let receiver = stub("receiver")
    let invocation = new Invocation(receiver, "method", ["arg"])

    this.assert(invocation.matches(receiver, "method", ["arg"]))
    this.assert(invocation.matches(receiver, "method"))
    this.assert(invocation.matches(receiver))
    this.assertNot(invocation.matches({}, "method", ["arg"]))
    this.assertNot(invocation.matches(receiver, "otherMethod", ["arg"]))
    this.assertNot(invocation.matches(receiver, "method", []))
  }

  "test toString"() {
    let receiver = stub("receiver")
    receiver.stubs.method("toString").returns("receiver")
    let withoutArgs = new Invocation(receiver, "method", [])
    let withArgs = new Invocation(receiver, "method", ["arg"])

    this.assertEqual("receiver.method()", withoutArgs.toString())
    this.assertEqual('receiver.method("arg")', withArgs.toString())
  }
}

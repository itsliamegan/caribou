import { TestCase, stub } from ".."
import { Invocation } from "../lib/invocation"

export class InvocationTest extends TestCase {
  "test matches"() {
    let receiver = stub("receiver")
    let invocation = new Invocation(receiver, "method", ["arg"])

    this.assert(invocation.matches(receiver, "method", ["arg"]))
    this.assert(invocation.matches(receiver, "method"))
    this.assert(invocation.matches(receiver))
    this.assert_not(invocation.matches({}, "method", ["arg"]))
    this.assert_not(invocation.matches(receiver, "other_method", ["arg"]))
    this.assert_not(invocation.matches(receiver, "method", []))
  }

  "test toString"() {
    let receiver = stub("receiver")
    receiver.stubs.method("toString").returns("receiver")
    let withoutArgs = new Invocation(receiver, "method", [])
    let withArgs = new Invocation(receiver, "method", ["arg"])

    this.assert_equal("receiver.method()", withoutArgs.toString())
    this.assert_equal('receiver.method("arg")', withArgs.toString())
  }
}

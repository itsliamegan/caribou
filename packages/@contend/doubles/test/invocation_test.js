import { TestCase } from "@contend/core"
import { assert, assert_not, assert_equal } from "@contend/assertions"
import { stub } from "@contend/doubles"
import { Invocation } from "../lib/invocation"

export class InvocationTest extends TestCase {
  "test matches"() {
    let receiver = stub("receiver")
    let invocation = new Invocation(receiver, "method", ["arg"])

    assert(invocation.matches(receiver, "method", ["arg"]))
    assert(invocation.matches(receiver, "method"))
    assert(invocation.matches(receiver))
    assert_not(invocation.matches({}, "method", ["arg"]))
    assert_not(invocation.matches(receiver, "other_method", ["arg"]))
    assert_not(invocation.matches(receiver, "method", []))
  }

  "test toString"() {
    let receiver = stub("receiver")
    receiver.stubs.method("toString").returns("receiver")
    let without_args = new Invocation(receiver, "method", [])
    let with_args = new Invocation(receiver, "method", ["arg"])

    assert_equal("receiver.method()", without_args.toString())
    assert_equal('receiver.method("arg")', with_args.toString())
  }
}

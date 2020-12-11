import { AssertionError } from "@contend/assertions"
import { InstanceStub } from "./instance_stub"
import { Expectation } from "./expectation"
import { Invocation } from "./invocation"

export class InstanceMock extends InstanceStub {
  constructor(name) {
    super(name)

    this.expectations = []
    this.invocations = []
  }

  verify() {
    let message = ""

    if (this.unsatisfied) {
      message += "Unsatisfied expectations:"

      for (let expectation of this.unsatisfied_expectations) {
        message += "\n"
        message += `      ${expectation.toString()}`
      }
    }

    if (this.unsatisfied && this.received_unexpected_invocation) {
      message += "\n\n    "
    }

    if (this.received_unexpected_invocation) {
      message += "Unexpected invocations:"

      for (let invocation of this.unexpected_invocations) {
        message += "\n"
        message += `      ${invocation.toString()}`
      }
    }

    if (message) {
      throw new AssertionError(message)
    }
  }

  expects(method) {
    let expectation = new Expectation(this, method)
    this.expectations.push(expectation)

    return expectation
  }

  get satisfied() {
    return this.expectations.every(expectation => expectation.satisfied)
  }

  get unsatisfied() {
    return this.unsatisfied_expectations.length > 0
  }

  get received_unexpected_invocation() {
    return this.unexpected_invocations.length > 0
  }

  get unsatisfied_expectations() {
    return this.expectations.filter(expectation => expectation.unsatisfied)
  }

  get unexpected_invocations() {
    return this.invocations.filter(
      invocation => !this.expectations.some(expectation => expectation.satisfied_by(invocation))
    )
  }

  toString() {
    return `mock("${this.name}")`
  }

  invoked(method) {
    return this.invocations.some(invocation => invocation.matches(this, method))
  }

  invoked_with_args(method, args) {
    return this.invocations.some(invocation => invocation.matches(this, method, args))
  }

  stub_expected_method(method, return_value) {
    this.stubs.property(method).value((...args) => {
      let invocation = new Invocation(this, method, args)
      this.invocations.push(invocation)

      return return_value
    })
  }
}

import { Stub } from "./stub"
import { Expectation } from "./expectation"
import { AssertionError } from "./errors/assertion_error"
import { Invocation } from "./invocation"

export class Mock extends Stub {
  constructor(name) {
    super(name)

    this.expectations = []
    this.invocations = []
  }

  verify() {
    let message = ""

    if (this.unsatisfied) {
      message += "Unsatisfied expectations:"

      for (let expectation of this.unsatisfiedExpectations) {
        message += "\n"
        message += `      ${expectation.toString()}`
      }
    }

    if (this.unsatisfied && this.receivedUnexpectedInvocation) {
      message += "\n\n    "
    }

    if (this.receivedUnexpectedInvocation) {
      message += "Unexpected invocations:"

      for (let invocation of this.unexpectedInvocations) {
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
    return this.unsatisfiedExpectations.length > 0
  }

  get receivedUnexpectedInvocation() {
    return this.unexpectedInvocations.length > 0
  }

  get unsatisfiedExpectations() {
    return this.expectations.filter(expectation => expectation.unsatisfied)
  }

  get unexpectedInvocations() {
    return this.invocations.filter(
      invocation => !this.expectations.some(expectation => expectation.satisfiedBy(invocation))
    )
  }

  toString() {
    return `mock("${this.name}")`
  }

  invoked(method) {
    return this.invocations.filter(invocation => invocation.method == method).length > 0
  }

  invokedWithArgs(method, args) {
    return this.invocations.some(invocation => invocation.matches(this, method, args))
  }

  stubExpectedMethod(method, returnValue) {
    this.stubs.property(method).value((...args) => {
      let invocation = new Invocation(this, method, args)
      this.invocations.push(invocation)

      return returnValue
    })
  }
}

export function mock(name) {
  return new Mock(name)
}

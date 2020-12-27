import { AssertionError } from "@contend/assertions"
import { Stub } from "./stub"
import { InvocationTrackingMethodDefinition } from "./invocation_tracking_method_definition"
import { Expectation } from "./expectation"

export class Mock extends Stub {
  constructor(descriptor, subject) {
    super(descriptor, subject)

    this.expectations = []
    this.invocations = []
  }

  expects(method) {
    return new ExpectationDelegate(this, method)
  }

  verify() {
    if (this.has_any_unsatisfied_expectations) {
      let message = ""

      for (let unsatisfied_expectation of this.unsatisfied_expectations) {
        message += `Unsatisfied invocation: ${unsatisfied_expectation}\n`
      }

      throw new AssertionError(message)
    }
  }

  add_expectation(expectation) {
    this.expectations.push(expectation)
  }

  add_invocation(invocation) {
    if (this.has_no_expectations_matching(invocation.method, invocation.args)) {
      throw new AssertionError(`Unexpected invocation: ${invocation}`)
    } else {
      this.invocations.push(invocation)
    }
  }

  has_no_expectations_matching(method, args) {
    return !this.expectations.some(expectation =>
      expectation.matches(method, args)
    )
  }

  has_no_invocations_matching(method, args_matcher) {
    return !this.invocations.some(invocation =>
      invocation.matches(method, args_matcher)
    )
  }

  get unsatisfied_expectations() {
    return this.expectations.filter(expectation => expectation.is_unsatisfied)
  }

  get has_any_unsatisfied_expectations() {
    return this.unsatisfied_expectations.length != 0
  }
}

class ExpectationDelegate {
  constructor(mock, method) {
    this.definition = new InvocationTrackingMethodDefinition(mock, method, mock)
    this.expectation = new Expectation(mock, mock.subject, method)

    mock.add_definition(this.definition)
    mock.add_expectation(this.expectation)
  }

  with(...args) {
    this.definition.required_args = args
    this.expectation.expected_args = args
  }

  returns(value) {
    this.definition.return_value = value
  }
}

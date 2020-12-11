import { Invocation } from "./invocation"

export class Expectation {
  constructor(mock, method) {
    this.mock = mock
    this.method = method
    this.expected_args = undefined

    this.mock.stub_expected_method(this.method)
  }

  with(...args) {
    this.expected_args = args

    return this
  }

  returns(value) {
    this.mock.stub_expected_method(this.method, value)
  }

  satisfied_by(invocation) {
    if (!this.expects_args) {
      return invocation.matches(this.mock, this.method)
    }

    return invocation.matches(this.mock, this.method, this.expected_args || [])
  }

  get satisfied() {
    return this.invoked && this.invoked_with_correct_args
  }

  get unsatisfied() {
    return !this.satisfied
  }

  toString() {
    let invocation = new Invocation(
      this.mock,
      this.method,
      this.expected_args || []
    )

    return invocation.toString()
  }

  get invoked() {
    return this.mock.invoked(this.method)
  }

  get invoked_with_correct_args() {
    if (!this.expects_args) {
      return true
    }

    return this.mock.invoked_with_args(this.method, this.expected_args)
  }

  get expects_args() {
    return this.expected_args != undefined
  }
}

import { Invocation } from "./invocation"

export class Expectation {
  constructor(mock, method) {
    this.mock = mock
    this.method = method
    this.expectedArgs = undefined

    this.mock.stubExpectedMethod(this.method)
  }

  with(...args) {
    this.expectedArgs = args
  }

  returns(value) {
    this.mock.stubExpectedMethod(this.method, value)
  }

  satisfiedBy(invocation) {
    if (!this.expectsArgs) {
      return invocation.matches(this.mock, this.method)
    }

    return invocation.matches(this.mock, this.method, this.expectedArgs || [])
  }

  get satisfied() {
    return this.invoked && this.invokedWithCorrectArgs
  }

  get unsatisfied() {
    return !this.satisfied
  }

  toString() {
    return new Invocation(this.mock, this.method, this.expectedArgs || []).toString()
  }

  get invoked() {
    return this.mock.invoked(this.method)
  }

  get invokedWithCorrectArgs() {
    if (!this.expectsArgs) {
      return true
    }

    return this.mock.invokedWithArgs(this.method, this.expectedArgs)
  }

  get expectsArgs() {
    return this.expectedArgs != undefined
  }
}

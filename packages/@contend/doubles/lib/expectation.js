import { AnythingMatcher } from "./matchers/anything_matcher"
import { ArgumentsMatcher } from "./matchers/arguments_matcher"
import { Invocation } from "./invocation"

export class Expectation {
  constructor(mock, receiver, method) {
    this.mock = mock
    this.receiver = receiver
    this.method = method
    this.args_matcher = new AnythingMatcher()
  }

  matches(method, args) {
    return method == this.method && this.args_matcher.matches(args)
  }

  set expected_args(args) {
    this.args_matcher = new ArgumentsMatcher(args)
  }

  get is_unsatisfied() {
    return this.mock.has_no_invocations_matching(this.method, this.args_matcher)
  }

  get expected_invocation() {
    return new Invocation(this.receiver, this.method, [])
  }

  toString() {
    return this.expected_invocation.toString()
  }
}

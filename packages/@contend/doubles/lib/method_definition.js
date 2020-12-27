import { AnythingMatcher } from "./matchers/anything_matcher"
import { ArgumentsMatcher } from "./matchers/arguments_matcher"

export class MethodDefinition {
  constructor(stub, method) {
    this.stub = stub
    this.method = method
    this.return_value = undefined
    this.args_matcher = new AnythingMatcher()
  }

  define_on(subject) {
    subject.wrap(this.method, this.implementation.bind(this))
  }

  undefine_on(subject) {
    subject.unwrap(this.method)
  }

  call(args) {
    return this.implementation(...args)
  }

  matches(args) {
    return this.args_matcher.matches(args)
  }

  set required_args(args) {
    this.args_matcher = new ArgumentsMatcher(args)
  }

  implementation(...args) {
    if (this.matches(args)) {
      return this.return_value
    } else if (this.stub.has_matching_definition_for(args)) {
      return this.stub.call_matching_definition_for(args)
    }
  }
}

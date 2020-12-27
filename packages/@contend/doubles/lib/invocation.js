import { literal_print } from "@contend/support"

export class Invocation {
  constructor(receiver, method, args) {
    this.receiver = receiver
    this.method = method
    this.args = args
  }

  matches(method, args_matcher) {
    return method == this.method && args_matcher.matches(this.args)
  }

  toString() {
    return `${this.receiver}.${this.method}(${this.literal_printed_args_without_brackets})`
  }

  get literal_printed_args_without_brackets() {
    return literal_print(this.args).slice(1, -1)
  }
}

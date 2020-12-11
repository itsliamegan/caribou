import { deep_equal } from "./support/deep_equal"
import { literal_print } from "./support/literal_print"

export class Invocation {
  constructor(receiver, method, args) {
    this.receiver = receiver
    this.method = method
    this.args = args
  }

  matches(receiver, method, args) {
    if (receiver && method && args) {
      return (
        this.receiver == receiver &&
        this.method == method &&
        deep_equal(this.args, args)
      )
    } else if (receiver && method) {
      return this.receiver == receiver && this.method == method
    } else if (receiver) {
      return this.receiver == receiver
    }
  }

  toString() {
    return `${this.receiver.toString()}.${this.method}(${this.literal_args})`
  }

  get literal_args() {
    return literal_print(this.args).slice(1, -1)
  }
}

import { deepEqual } from "./support/deep_equal"
import { literalPrint } from "./support/literal_print"

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
        deepEqual(this.args, args)
      )
    } else if (receiver && method) {
      return this.receiver == receiver && this.method == method
    } else if (receiver) {
      return this.receiver == receiver
    }
  }

  toString() {
    return `${this.receiver.toString()}.${this.method}(${this.literalArgs})`
  }

  get literalArgs() {
    return literalPrint(this.args).slice(1, -1)
  }
}

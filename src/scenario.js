import { AssertionError } from "./errors/assertion_error"

export class Scenario {
  constructor(test, method) {
    this.test = test
    this.method = method
  }

  async run() {
    try {
      await this.method.apply(this.test)
      this.test.pass(this)
    } catch (error) {
      //console.log(error.stack)
      let message = error.message

      if (!(error instanceof AssertionError)) {
        message = `${error.name}: ` + message
      }

      this.test.fail(this, message)
    }
  }

  get name() {
    return this.method.name.replace("test ", "")
  }
}

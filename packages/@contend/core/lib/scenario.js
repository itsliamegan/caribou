import { AssertionError } from "contend/assertions"

export class Scenario {
  constructor(test, instance, method) {
    this.test = test
    this.instance = instance
    this.method = method
  }

  async run() {
    try {
      await this.method.apply(this.instance)
      this.test.pass(this)
    } catch (error) {
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

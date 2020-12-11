import { SuiteStarted } from "./events/suite_started"
import { SuiteFinished } from "./events/suite_finished"

export class Suite {
  constructor(bus) {
    this.bus = bus
    this.tests = []
  }

  async run() {
    this.bus.post(new SuiteStarted({ suite: this }))
    this.startedAt = Date.now()

    for (let test of this.tests) {
      await test.run()
    }

    this.finishedAt = Date.now()
    this.bus.post(new SuiteFinished({ suite: this }))
  }

  register(test) {
    this.tests.push(test)
  }

  get time() {
    return this.finishedAt - this.startedAt
  }

  get passed() {
    return this.tests.every(test => test.passed)
  }

  get failed() {
    return this.tests.some(test => test.failed)
  }
}

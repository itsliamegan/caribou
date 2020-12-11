import { SuiteStarted } from "./events/suite_started"
import { SuiteFinished } from "./events/suite_finished"
import { TestCaseStarted } from "./events/test_case_started"
import { TestCaseFinished } from "./events/test_case_finished"
import { Color } from "./color"

export class Reporter {
  constructor(bus, sink) {
    this.bus = bus
    this.sink = sink
  }

  listen() {
    this.bus.register(SuiteStarted, this)
    this.bus.register(SuiteFinished, this)
    this.bus.register(TestCaseStarted, this)
    this.bus.register(TestCaseFinished, this)
  }

  received(event) {
    switch (event.type) {
      case SuiteStarted:
        this.suite_started(event.payload.suite)
        break

      case SuiteFinished:
        this.suite_finished(event.payload.suite)
        break

      case TestCaseFinished:
        this.test_case_finished(event.payload.test)
        break
    }
  }

  suite_started(suite) {
    this.sink.write("Running...\n\n")
  }

  suite_finished(suite) {
    let milliseconds = suite.time
    let seconds = milliseconds / 1000

    this.sink.write(`\nRan tests in ${seconds.toFixed(2)}s\n`)
  }

  test_case_finished(test) {
    if (test.passed) {
      this.sink.write(" PASS ", { foreground: Color.white, background: Color.green })
    } else {
      this.sink.write(" FAIL ", { foreground: Color.white, background: Color.red })
    }

    this.sink.write(` ${test.name}\n`)

    if (test.failed) {
      this.sink.write("\n")

      for (let failure of test.failures) {
        this.sink.write(`  ${failure.name}\n`)
        this.sink.write(`  → ${failure.message}\n`, { foreground: Color.red })
        this.sink.write("\n")
      }
    }
  }
}

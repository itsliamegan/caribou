import { Result } from "./result"
import { Scenario } from "./scenario"
import { TestCaseStarted } from "./events/test_case_started"
import { TestCaseFinished } from "./events/test_case_finished"
import { AssertionError } from "./errors/assertion_error"
import { literalPrint } from "./support/literal_print"
import { deepEqual } from "./support/deep_equal"

export class TestCase {
  constructor(bus) {
    this.bus = bus
    this.results = []
  }

  async run() {
    this.bus.post(new TestCaseStarted({ test: this }))

    for (let scenario of this.scenarios) {
      await this.setup()
      await scenario.run()
      await this.teardown()
    }

    this.bus.post(new TestCaseFinished({ test: this }))
  }

  async setup() {}

  async teardown() {}

  get passed() {
    return this.results.every(result => result.passed)
  }

  get failed() {
    return this.results.some(result => result.failed)
  }

  get failures() {
    return this.results.filter(result => result.failed)
  }

  get name() {
    return this.constructor.name
  }

  pass(scenario) {
    let result = Result.passed(scenario)

    this.results.push(result)
  }

  fail(scenario, message) {
    let result = Result.failed(scenario, message)

    this.results.push(result)
  }

  assert(condition, message) {
    if (!message) {
      message = `Expected ${literalPrint(condition)} to be truthy`
    }

    if (!condition) {
      throw new AssertionError(message)
    }
  }

  assertNot(condition) {
    this.assert(!condition, `Expected ${literalPrint(condition)} to be falsey`)
  }

  assertEqual(expected, actual) {
    this.assert(
      deepEqual(expected, actual),
      `Expected ${literalPrint(actual)} to equal ${literalPrint(expected)}`
    )
  }

  assertNotEqual(expected, actual) {
    this.assert(
      !deepEqual(expected, actual),
      `Expected ${literalPrint(actual)} not to equal ${literalPrint(expected)}`
    )
  }

  assertThrows(fn, errorType) {
    let error

    try {
      fn()
    } catch (e) {
      error = e
    }

    if (error == undefined) {
      throw new AssertionError(
        `Expected function to throw ${errorType.name}, but it didn't`
      )
    }

    if (!(error instanceof errorType)) {
      throw new AssertionError(
        `Expected function to throw ${errorType.name}, but it threw ${error}`
      )
    }
  }

  assertNotThrows(fn) {
    let error

    try {
      fn()
    } catch (e) {
      error = e
    }

    if (error != undefined) {
      throw new AssertionError(
        `Expected function not to throw, but it threw ${error}`
      )
    }
  }

  get scenarios() {
    return this.scenarioMethods.map(
      scenarioMethod => new Scenario(this, scenarioMethod)
    )
  }

  get scenarioMethods() {
    return this.methods.filter(method => method.name.startsWith("test"))
  }

  get methods() {
    return this.properties.filter(property => typeof property == "function")
  }

  get properties() {
    return this.propertyNames.map(propertyName => this[propertyName])
  }

  get propertyNames() {
    return Object.getOwnPropertyNames(this.prototype)
  }

  get prototype() {
    return Object.getPrototypeOf(this)
  }
}

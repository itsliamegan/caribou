import { Result } from "./result"
import { Scenario } from "./scenario"
import { TestCaseStarted } from "./events/test_case_started"
import { TestCaseFinished } from "./events/test_case_finished"
import { AssertionError } from "./errors/assertion_error"
import { literal_print } from "./support/literal_print"
import { deep_equal } from "./support/deep_equal"

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
      message = `Expected ${literal_print(condition)} to be truthy`
    }

    if (!condition) {
      throw new AssertionError(message)
    }
  }

  assert_not(condition) {
    this.assert(!condition, `Expected ${literal_print(condition)} to be falsey`)
  }

  assert_equal(expected, actual) {
    this.assert(
      deep_equal(expected, actual),
      `Expected ${literal_print(actual)} to equal ${literal_print(expected)}`
    )
  }

  assert_not_equal(expected, actual) {
    this.assert(
      !deep_equal(expected, actual),
      `Expected ${literal_print(actual)} not to equal ${literal_print(expected)}`
    )
  }

  assert_throws(fn, error_type) {
    let error

    try {
      fn()
    } catch (e) {
      error = e
    }

    if (error == undefined) {
      throw new AssertionError(
        `Expected function to throw ${error_type.name}, but it didn't`
      )
    }

    if (!(error instanceof error_type)) {
      throw new AssertionError(
        `Expected function to throw ${error_type.name}, but it threw ${error}`
      )
    }
  }

  assert_not_throws(fn) {
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
    return this.scenario_methods.map(
      scenario_method => new Scenario(this, scenario_method)
    )
  }

  get scenario_methods() {
    return this.methods.filter(this.is_scenario_method)
  }

  get methods() {
    return this.properties.filter(this.is_method)
  }

  get properties() {
    return this.property_names.map(property_name => this[property_name])
  }

  get property_names() {
    return Object.getOwnPropertyNames(this.prototype)
  }

  get prototype() {
    return Object.getPrototypeOf(this)
  }

  is_scenario_method(method) {
    return method.name.startsWith("test")
  }

  is_method(property) {
    return typeof property == "function"
  }
}

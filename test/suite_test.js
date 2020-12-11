import { TestCase, mock, stub } from ".."
import { Suite } from "../lib/suite"
import { SuiteStarted } from "../lib/events/suite_started"
import { SuiteFinished } from "../lib/events/suite_finished"

export class SuiteTest extends TestCase {
  async "test runs all registered tests"() {
    let test = mock("test")
    test.expects("run")
    let bus = stub("bus")
    bus.stubs.method("post")
    let suite = new Suite(bus)

    suite.register(test)
    await suite.run()

    test.verify()
  }

  async "test runs async tests"() {
    let asyncTest = mock("asyncTest")
    asyncTest.expects("run").returns(Promise.resolve())
    let bus = stub("bus")
    bus.stubs.method("post")
    let suite = new Suite(bus)

    suite.register(asyncTest)
    await suite.run()

    asyncTest.verify()
  }

  async "test posts lifecycle events"() {
    let bus = mock("bus")
    let suite = new Suite(bus)
    bus.expects("post").with(new SuiteStarted({ suite }))
    bus.expects("post").with(new SuiteFinished({ suite }))

    await suite.run()

    bus.verify()
  }

  async "test time"() {
    let bus = stub("bus")
    bus.stubs.method("post")
    let suite = new Suite(bus)

    await suite.run()

    this.assert_equal("number", typeof suite.time)
    this.assert_not_equal(NaN, suite.time)
  }

  async "test passed"() {
    let passingTest = stub("passingTest")
    passingTest.stubs.method("run")
    passingTest.stubs.property("passed").value(true)
    passingTest.stubs.property("failed").value(false)
    let failingTest = stub("failingTest")
    failingTest.stubs.method("run")
    failingTest.stubs.property("passed").value(false)
    failingTest.stubs.property("failed").value(true)
    let bus = stub("bus")
    bus.stubs.method("post")
    let passing = new Suite(bus)
    let failing = new Suite(bus)
    let partiallyPassing = new Suite(bus)
    passing.register(passingTest)
    failing.register(failingTest)
    partiallyPassing.register(passingTest)
    partiallyPassing.register(failingTest)

    await passing.run()
    await failing.run()
    await partiallyPassing.run()

    this.assert(passing.passed)
    this.assert_not(failing.passed)
    this.assert_not(partiallyPassing.passed)
  }

  async "test failed"() {
    let passingTest = stub("passingTest")
    passingTest.stubs.method("run")
    passingTest.stubs.property("passed").value(true)
    passingTest.stubs.property("failed").value(false)
    let failingTest = stub("failingTest")
    failingTest.stubs.method("run")
    failingTest.stubs.property("passed").value(false)
    failingTest.stubs.property("failed").value(true)
    let bus = stub("bus")
    bus.stubs.method("post")
    let passing = new Suite(bus)
    let failing = new Suite(bus)
    let partiallyPassing = new Suite(bus)
    passing.register(passingTest)
    failing.register(failingTest)
    partiallyPassing.register(passingTest)
    partiallyPassing.register(failingTest)

    await passing.run()
    await failing.run()
    await partiallyPassing.run()

    this.assert_not(passing.failed)
    this.assert(failing.failed)
    this.assert(partiallyPassing.failed)
  }
}

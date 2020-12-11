import { TestCase } from "contend"
import {
  assert,
  assert_not,
  assert_equal,
  assert_not_equal
} from "contend/assertions"
import { mock, stub } from "contend/doubles"
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
    let async_test = mock("async_test")
    async_test.expects("run").returns(Promise.resolve())
    let bus = stub("bus")
    bus.stubs.method("post")
    let suite = new Suite(bus)

    suite.register(async_test)
    await suite.run()

    async_test.verify()
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

    assert_equal("number", typeof suite.time)
    assert_not_equal(NaN, suite.time)
  }

  async "test passed"() {
    let passing_test = stub("passing_test")
    passing_test.stubs.method("run")
    passing_test.stubs.property("passed").value(true)
    passing_test.stubs.property("failed").value(false)
    let failing_test = stub("failing_test")
    failing_test.stubs.method("run")
    failing_test.stubs.property("passed").value(false)
    failing_test.stubs.property("failed").value(true)
    let bus = stub("bus")
    bus.stubs.method("post")
    let passing = new Suite(bus)
    let failing = new Suite(bus)
    let partially_passing = new Suite(bus)
    passing.register(passing_test)
    failing.register(failing_test)
    partially_passing.register(passing_test)
    partially_passing.register(failing_test)

    await passing.run()
    await failing.run()
    await partially_passing.run()

    assert(passing.passed)
    assert_not(failing.passed)
    assert_not(partially_passing.passed)
  }

  async "test failed"() {
    let passing_test = stub("passing_test")
    passing_test.stubs.method("run")
    passing_test.stubs.property("passed").value(true)
    passing_test.stubs.property("failed").value(false)
    let failing_test = stub("failing_test")
    failing_test.stubs.method("run")
    failing_test.stubs.property("passed").value(false)
    failing_test.stubs.property("failed").value(true)
    let bus = stub("bus")
    bus.stubs.method("post")
    let passing = new Suite(bus)
    let failing = new Suite(bus)
    let partially_passing = new Suite(bus)
    passing.register(passing_test)
    failing.register(failing_test)
    partially_passing.register(passing_test)
    partially_passing.register(failing_test)

    await passing.run()
    await failing.run()
    await partially_passing.run()

    assert_not(passing.failed)
    assert(failing.failed)
    assert(partially_passing.failed)
  }
}

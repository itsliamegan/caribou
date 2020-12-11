import { assert, assert_not, assert_equal, assert_undefined } from "contend/assertions"
import { mock, stub } from "contend/doubles"
import { TestCase } from "../lib/test_case"
import { TestCaseStarted } from "../lib/events/test_case_started"
import { TestCaseFinished } from "../lib/events/test_case_finished"

class PassingTest extends TestCase {
  "test method"() {
    assert(true)
  }
}

class FailingTest extends TestCase {
  "test method"() {
    assert(false)
  }
}

class PartiallyPassingTest extends TestCase {
  "test passing"() {
    assert(true)
  }

  "test failing"() {
    assert(false)
  }
}

export class TestCaseTest extends TestCase {
  async "test runs all the test methods"() {
    let ran_first_test = false
    let ran_second_test = false
    let ran_unrelated_method = false

    class ExampleTest extends TestCase {
      "test method one"() {
        ran_first_test = true
      }

      "test method two"() {
        ran_second_test = true
      }

      "unrelated method"() {
        ran_unrelated_method = true
      }
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let test = new ExampleTest(bus)

    await test.run()

    assert(ran_first_test)
    assert(ran_second_test)
    assert_not(ran_unrelated_method)
  }

  async "test runs async test methods"() {
    let ran_async_test = false

    class AsynchronousTest extends TestCase {
      async "test asynchronous"() {
        await Promise.resolve()
        ran_async_test = true
      }
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let test = new AsynchronousTest(bus)

    await test.run()

    assert(ran_async_test)
  }

  async "test posts lifecycle events"() {
    class ExampleTest extends TestCase {}
    let bus = mock("bus")
    let test = new ExampleTest(bus)
    bus.expects("post").with(new TestCaseStarted({ test }))
    bus.expects("post").with(new TestCaseFinished({ test }))

    await test.run()

    bus.verify()
  }

  async "test runs lifecycle metohds around each scenario"() {
    let setup_ran_times = 0
    let teardown_ran_times = 0

    class WithLifecycles extends TestCase {
      setup() {
        setup_ran_times++
      }

      teardown() {
        teardown_ran_times++
      }

      "test first"() {}

      "test second"() {}
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let test = new WithLifecycles(bus)

    await test.run()

    assert_equal(2, setup_ran_times)
    assert_equal(2, teardown_ran_times)
  }

  async "test runs async lifecycle methods"() {
    let setup_ran = false
    let teardown_ran = false

    class WithLifecycles extends TestCase {
      async setup() {
        await Promise.resolve()
        setup_ran = true
      }

      async teardown() {
        await Promise.resolve()
        teardown_ran = true
      }

      "test method"() {}
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let test = new WithLifecycles(bus)

    await test.run()

    assert(setup_ran)
    assert(teardown_ran)
  }

  async "test runs each scenario in a separate instance"() {
    let property_before_mutation

    class SharedState extends TestCase {
      state = {}

      "test mutate"() {
        property_before_mutation = this.state.property
        this.state.property = "mutate"
      }

      "test mutate again"() {
        property_before_mutation = this.state.property
        this.state.property = "mutate again"
      }
    }

    let bus = stub("bus")
    bus.stubs.method("post")

    let test = new SharedState(bus)
    await test.run()

    assert_undefined(property_before_mutation)
  }

  async "test passed"() {
    let bus = stub("bus")
    bus.stubs.method("post")
    let passing = new PassingTest(bus)
    let failing = new FailingTest(bus)
    let partially_passing = new PartiallyPassingTest(bus)
    await passing.run()
    await failing.run()
    await partially_passing .run()

    assert(passing.passed)
    assert_not(failing.passed)
    assert_not(partially_passing.passed)
  }

  async "test failed"() {
    let bus = stub("bus")
    bus.stubs.method("post")
    let passing = new PassingTest(bus)
    let failing = new FailingTest(bus)
    let partially_passing = new PartiallyPassingTest(bus)
    await passing.run()
    await failing.run()
    await partially_passing.run()

    assert(passing.passed)
    assert_not(failing.passed)
    assert_not(partially_passing.passed)
  }

  async "test failures"() {
    let bus = stub("bus")
    bus.stubs.method("post")
    let passing = new PassingTest(bus)
    let failing = new FailingTest(bus)
    let partially_passing = new PartiallyPassingTest(bus)

    await passing.run()
    await failing.run()
    await partially_passing.run()

    assert_equal(0, passing.failures.length)
    assert_equal(1, failing.failures.length)
    assert_equal(1, partially_passing.failures.length)
  }

  "test name"() {
    class ExampleTest extends TestCase {}

    let test = new ExampleTest()

    assert_equal("ExampleTest", test.name)
  }
}

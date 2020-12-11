import { mock, stub } from ".."
import { TestCase } from "../lib/test_case"
import { TestCaseStarted } from "../lib/events/test_case_started"
import { TestCaseFinished } from "../lib/events/test_case_finished"

class PassingTest extends TestCase {
  "test method"() {
    this.assert(true)
  }
}

class FailingTest extends TestCase {
  "test method"() {
    this.assert(false)
  }
}

class PartiallyPassingTest extends TestCase {
  "test passing"() {
    this.assert(true)
  }

  "test failing"() {
    this.assert(false)
  }
}

export class TestCaseTest extends TestCase {
  async "test runs all the test methods"() {
    class ExampleTest extends TestCase {
      "test method one"() {
        this.ran_first_test = true
      }

      "test method two"() {
        this.ran_second_test = true
      }

      "unrelated method"() {
        this.ran_unrelated_method = true
      }
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let test = new ExampleTest(bus)

    await test.run()

    this.assert(test.ran_first_test)
    this.assert(test.ran_second_test)
    this.assert_not(test.ran_unrelated_method)
  }

  async "test runs async test methods"() {
    class AsynchronousTest extends TestCase {
      async "test asynchronous"() {
        await Promise.resolve()

        this.ran_async_test = true
      }
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let test = new AsynchronousTest(bus)

    await test.run()

    this.assert(test.ran_async_test)
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
    class WithLifecycles extends TestCase {
      setup() {
        this.setup_ran_times = this.setup_ran_times || 0
        this.setup_ran_times++
      }

      teardown() {
        this.teardown_ran_times = this.teardown_ran_times || 0
        this.teardown_ran_times++
      }

      "test first"() {}

      "test second"() {}
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let test = new WithLifecycles(bus)

    await test.run()

    this.assert_equal(2, test.setup_ran_times)
    this.assert_equal(2, test.teardown_ran_times)
  }

  async "test runs async lifecycle methods"() {
    class WithLifecycles extends TestCase {
      async setup() {
        await Promise.resolve()
        this.setup_ran = true
      }

      async teardown() {
        await Promise.resolve()
        this.teardown_ran = true
      }

      "test method"() {}
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let test = new WithLifecycles(bus)

    await test.run()

    this.assert(test.setup_ran)
    this.assert(test.teardown_ran)
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

    this.assert(passing.passed)
    this.assert_not(failing.passed)
    this.assert_not(partially_passing.passed)
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

    this.assert(passing.passed)
    this.assert_not(failing.passed)
    this.assert_not(partially_passing.passed)
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

    this.assert_equal(0, passing.failures.length)
    this.assert_equal(1, failing.failures.length)
    this.assert_equal(1, partially_passing.failures.length)
  }

  "test name"() {
    class ExampleTest extends TestCase {}

    let test = new ExampleTest()

    this.assert_equal("ExampleTest", test.name)
  }

  async "test assert"() {
    class AssertsTrue extends TestCase {
      "test assert"() {
        this.assert(true)
      }
    }

    class AssertsFalse extends TestCase {
      "test assert"() {
        this.assert(false)
      }
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let passing_test = new AssertsTrue(bus)
    let failing_test = new AssertsFalse(bus)

    await passing_test.run()
    await failing_test.run()

    this.assert(passing_test.passed)
    this.assert(failing_test.failed)
  }

  async "test assert_not"() {
    class AssertsNotFalse extends TestCase {
      "test assert"() {
        this.assert_not(false)
      }
    }
    class AssertsNotTrue extends TestCase {
      "test assert"() {
        this.assert_not(true)
      }
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let passing_test = new AssertsNotFalse(bus)
    let failing_test = new AssertsNotTrue(bus)

    await passing_test.run()
    await failing_test.run()

    this.assert(passing_test.passed)
    this.assert(failing_test.failed)
  }

  async "test assert_equal"() {
    class AssertsEqualAreEqual extends TestCase {
      "test assert"() {
        this.assert_equal("value", "value")
      }
    }
    class AssertsUnequalAreEqual extends TestCase {
      "test assert"() {
        this.assert_equal("value", "other value")
      }
    }
    let bus = stub("bus")
    bus.stubs.method("post")
    let passing_test = new AssertsEqualAreEqual(bus)
    let failing_test = new AssertsUnequalAreEqual(bus)

    await passing_test.run()
    await failing_test.run()

    this.assert(passing_test.passed)
    this.assert(failing_test.failed)
  }

  async "test assert_not_equal"() {
    class AssertsUnequalAreNotEqual extends TestCase {
      "test assert"() {
        this.assert_not_equal("value", "other value")
      }
    }
    class AssertsEqualAreNotEqual extends TestCase {
      "test assert"() {
        this.assert_not_equal("value", "value")
      }
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let passing_test = new AssertsUnequalAreNotEqual(bus)
    let failing_test = new AssertsEqualAreNotEqual(bus)

    await passing_test.run()
    await failing_test.run()

    this.assert(passing_test.passed)
    this.assert(failing_test.failed)
  }

  async "test assert_throws"() {
    class AssertsThrowsThrows extends TestCase {
      "test assert"() {
        this.assert_throws(() => {
          throw new Error()
        }, Error)
      }
    }
    class AssertsDoesntThrowThrows extends TestCase {
      "test assert"() {
        this.assert_throws(() => {}, Error)
      }
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let passing_test = new AssertsThrowsThrows(bus)
    let failing_test = new AssertsDoesntThrowThrows(bus)

    await passing_test.run()
    await failing_test.run()

    this.assert(passing_test.passed)
    this.assert(failing_test.failed)
  }

  async "test assert_not_throws"() {
    class AssertsDoesntThrowDoesntThrow extends TestCase {
      "test assert"() {
        this.assert_not_throws(() => {}, Error)
      }
    }
    class AssertsThrowsDoesntThrow extends TestCase {
      "test assert"() {
        this.assert_not_throws(() => {
          throw new Error()
        })
      }
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let passing_test = new AssertsDoesntThrowDoesntThrow(bus)
    let failing_test = new AssertsThrowsDoesntThrow(bus)

    await passing_test.run()
    await failing_test.run()

    this.assert(passing_test.passed)
    this.assert(failing_test.failed)
  }
}

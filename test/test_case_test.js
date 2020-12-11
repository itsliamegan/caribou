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
        this.ranFirstTest = true
      }

      "test method two"() {
        this.ranSecondTest = true
      }

      "unrelated method"() {
        this.ranUnrelatedMethod = true
      }
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let test = new ExampleTest(bus)

    await test.run()

    this.assert(test.ranFirstTest)
    this.assert(test.ranSecondTest)
    this.assert_not(test.ranUnrelatedMethod)
  }

  async "test runs async test methods"() {
    class AsynchronousTest extends TestCase {
      async "test asynchronous"() {
        await Promise.resolve()

        this.ranAsyncTest = true
      }
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let test = new AsynchronousTest(bus)

    await test.run()

    this.assert(test.ranAsyncTest)
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
        this.setupRanTimes = this.setupRanTimes || 0
        this.setupRanTimes++
      }

      teardown() {
        this.teardownRanTimes = this.teardownRanTimes || 0
        this.teardownRanTimes++
      }

      "test first"() {}

      "test second"() {}
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let test = new WithLifecycles(bus)

    await test.run()

    this.assert_equal(2, test.setupRanTimes)
    this.assert_equal(2, test.teardownRanTimes)
  }

  async "test runs async lifecycle methods"() {
    class WithLifecycles extends TestCase {
      async setup() {
        await Promise.resolve()
        this.setupRan = true
      }

      async teardown() {
        await Promise.resolve()
        this.teardownRan = true
      }

      "test method"() {}
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let test = new WithLifecycles(bus)

    await test.run()

    this.assert(test.setupRan)
    this.assert(test.teardownRan)
  }

  async "test passed"() {
    let bus = stub("bus")
    bus.stubs.method("post")
    let passing = new PassingTest(bus)
    let failing = new FailingTest(bus)
    let partiallyPassing = new PartiallyPassingTest(bus)
    await passing.run()
    await failing.run()
    await partiallyPassing.run()

    this.assert(passing.passed)
    this.assert_not(failing.passed)
    this.assert_not(partiallyPassing.passed)
  }

  async "test failed"() {
    let bus = stub("bus")
    bus.stubs.method("post")
    let passing = new PassingTest(bus)
    let failing = new FailingTest(bus)
    let partiallyPassing = new PartiallyPassingTest(bus)
    await passing.run()
    await failing.run()
    await partiallyPassing.run()

    this.assert(passing.passed)
    this.assert_not(failing.passed)
    this.assert_not(partiallyPassing.passed)
  }

  async "test failures"() {
    let bus = stub("bus")
    bus.stubs.method("post")
    let passing = new PassingTest(bus)
    let failing = new FailingTest(bus)
    let partiallyPassing = new PartiallyPassingTest(bus)

    await passing.run()
    await failing.run()
    await partiallyPassing.run()

    this.assert_equal(0, passing.failures.length)
    this.assert_equal(1, failing.failures.length)
    this.assert_equal(1, partiallyPassing.failures.length)
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
    let passingTest = new AssertsTrue(bus)
    let failingTest = new AssertsFalse(bus)

    await passingTest.run()
    await failingTest.run()

    this.assert(passingTest.passed)
    this.assert(failingTest.failed)
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
    let passingTest = new AssertsNotFalse(bus)
    let failingTest = new AssertsNotTrue(bus)

    await passingTest.run()
    await failingTest.run()

    this.assert(passingTest.passed)
    this.assert(failingTest.failed)
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
    let passingTest = new AssertsEqualAreEqual(bus)
    let failingTest = new AssertsUnequalAreEqual(bus)

    await passingTest.run()
    await failingTest.run()

    this.assert(passingTest.passed)
    this.assert(failingTest.failed)
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
    let passingTest = new AssertsUnequalAreNotEqual(bus)
    let failingTest = new AssertsEqualAreNotEqual(bus)

    await passingTest.run()
    await failingTest.run()

    this.assert(passingTest.passed)
    this.assert(failingTest.failed)
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
    let passingTest = new AssertsThrowsThrows(bus)
    let failingTest = new AssertsDoesntThrowThrows(bus)

    await passingTest.run()
    await failingTest.run()

    this.assert(passingTest.passed)
    this.assert(failingTest.failed)
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
    let passingTest = new AssertsDoesntThrowDoesntThrow(bus)
    let failingTest = new AssertsThrowsDoesntThrow(bus)

    await passingTest.run()
    await failingTest.run()

    this.assert(passingTest.passed)
    this.assert(failingTest.failed)
  }
}

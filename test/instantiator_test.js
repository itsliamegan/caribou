import { TestCase, stub } from ".."
import { Instantiator } from "../lib/instantiator"

export class InstantiatorTest extends TestCase {
  "test creates a new suite with instances of all the test classes"() {
    class FirstTest extends TestCase {}
    class SecondTest extends TestCase {}

    let bus = stub("bus")
    let classes = [FirstTest, SecondTest]
    let instantiator = new Instantiator(bus, classes)

    let suite = instantiator.suite
    let expected_tests = [new FirstTest(bus), new SecondTest(bus)]

    this.assert_equal(expected_tests, suite.tests)
  }
}

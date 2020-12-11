import { TestCase } from ".."
import { stub } from "../lib/doubles"
import { assert_equal } from "../lib/assertions"
import { Scenario } from "../lib/scenario"

export class ScenarioTest extends TestCase {
  "test name"() {
    let test = stub("test")
    test.stubs.method("test method")
    let scenario = new Scenario(test, test["test method"])

    assert_equal("method", scenario.name)
  }
}

import { TestCase } from "contend"
import { assert_equal } from "contend/assertions"
import { stub } from "contend/doubles"
import { Scenario } from "../lib/scenario"

export class ScenarioTest extends TestCase {
  "test name"() {
    let test = stub("test")
    test.stubs.method("test method")
    let instance = stub("instance")
    let scenario = new Scenario(test, instance, test["test method"])

    assert_equal("method", scenario.name)
  }
}

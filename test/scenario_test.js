import { TestCase, stub } from ".."
import { Scenario } from "../lib/scenario"

export class ScenarioTest extends TestCase {
  "test name"() {
    let test = stub("test")
    test.stubs.method("test method")
    let scenario = new Scenario(test, test["test method"])

    this.assertEqual("method", scenario.name)
  }
}

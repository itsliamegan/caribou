import { TestCase, stub } from ".."
import { Result } from "../lib/result"

export class ResultTest extends TestCase {
  "test name"() {
    let scenario = stub("scenario")
    scenario.stubs.property("name").value("test method")
    let result = new Result(scenario, "message")

    this.assert_equal("test method", result.name)
  }
}

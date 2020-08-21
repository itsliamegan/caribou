import { TestCase, stub } from ".."
import { Result } from "../src/result"

export class ResultTest extends TestCase {
  "test name"() {
    let scenario = stub("scenario")
    scenario.stubs.property("name").value("test method")
    let result = new Result(scenario, "message")

    this.assertEqual("test method", result.name)
  }
}

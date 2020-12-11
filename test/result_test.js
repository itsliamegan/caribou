import { TestCase } from ".."
import { stub } from "../lib/doubles"
import { assert_equal } from "../lib/assertions"
import { Result } from "../lib/result"

export class ResultTest extends TestCase {
  "test name"() {
    let scenario = stub("scenario")
    scenario.stubs.property("name").value("test method")
    let result = new Result(scenario, "message")

    assert_equal("test method", result.name)
  }
}

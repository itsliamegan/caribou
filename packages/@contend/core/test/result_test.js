import { TestCase } from "contend"
import { assert_equal } from "contend/assertions"
import { stub } from "contend/doubles"
import { Result } from "../lib/result"

export class ResultTest extends TestCase {
  "test name"() {
    let scenario = stub("scenario")
    scenario.stubs.property("name").value("test method")
    let result = new Result(scenario, "message")

    assert_equal("test method", result.name)
  }
}

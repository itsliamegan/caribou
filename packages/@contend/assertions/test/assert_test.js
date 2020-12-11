import { TestCase } from "@contend/core"
import { assert_throws, assert_not_throws, AssertionError } from "@contend/assertions"
import { assert } from "../lib/assert"

export class AssertTest extends TestCase {
  "test asserts that a value is truthy"() {
    assert_not_throws(() => assert(true))
    assert_throws(() => assert(false), AssertionError)
  }
}

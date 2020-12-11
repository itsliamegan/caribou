import { TestCase } from "@contend/core"
import { assert_throws, assert_not_throws, AssertionError } from "@contend/assertions"
import { assert_not } from "../lib/assert_not"

export class AssertNotTest extends TestCase {
  "test asserts that a value is falsey"() {
    assert_not_throws(() => assert_not(false))
    assert_throws(() => assert_not(true), AssertionError)
  }
}

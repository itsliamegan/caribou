import { TestCase } from "contend"
import { assert_throws, assert_not_throws, AssertionError } from "contend/assertions"
import { assert_undefined } from "../lib/assert_undefined"

export class AssertUndefinedTest extends TestCase {
  "test asserts that a value is strictly undefined"() {
    assert_not_throws(() => { assert_undefined(undefined) })
    assert_throws(() => { assert_undefined(null) }, AssertionError)
    assert_throws(() => { assert_undefined("value") }, AssertionError)
  }
}

import { TestCase } from "@contend/core"
import { assert_not_throws, AssertionError } from "@contend/assertions"
import { assert_throws } from "../lib/assert_throws"

export class AssertThrowsTest extends TestCase {
  "test asserts that a function throws an error"() {
    assert_not_throws(() => assert_throws(() => { throw new Error() }))
    assert_throws(() => assert_throws(() => {}), AssertionError)
  }

  "test asserts that a function throws an error of a specific type"() {
    assert_not_throws(() => assert_throws(() => { throw new TypeError() }, TypeError))
    assert_throws(() => assert_throws(() => { throw new Error() }, TypeError))
    assert_throws(() => assert_throws(() => {}), AssertionError)
  }
}

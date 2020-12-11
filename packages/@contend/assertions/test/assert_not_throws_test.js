import { TestCase } from "@contend/core"
import { assert_throws, AssertionError } from "@contend/assertions"
import { assert_not_throws } from "../lib/assert_not_throws"

export class AssertNotThrowsTest extends TestCase {
  "test asserts that a function doesn't throw an error"() {
    assert_not_throws(() => assert_not_throws(() => {}))
    assert_throws(
      () => assert_not_throws(() => { throw new Error() }),
      AssertionError
    )
  }
}

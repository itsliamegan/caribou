import { TestCase } from "@contend/core"
import { assert_throws, assert_not_throws, AssertionError } from "@contend/assertions"
import { assert_not_equal } from "../lib/assert_not_equal"

export class AssertNotEqualTest extends TestCase {
  "test asserts that two values are not shallowly equal"() {
    assert_not_throws(() => assert_not_equal("value", "other_value"))
    assert_throws(() => assert_not_equal("value", "value"), AssertionError)
  }

  "test asserts that two values are not deeply equal"() {
    assert_not_throws(
      () => assert_not_equal({ key: "value" }, { key: "other_value" }),
    )
    assert_throws(
      () => assert_not_equal({ key: "value" }, { key: "value" }),
      AssertionError
    )
  }
}

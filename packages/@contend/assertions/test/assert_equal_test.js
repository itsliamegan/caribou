import { TestCase } from "contend"
import { assert_throws, assert_not_throws, AssertionError } from "contend/assertions"
import { assert_equal } from "../lib/assert_equal"

export class AssertEqualTest extends TestCase {
  "test asserts that two values are shallowly equal"() {
    assert_not_throws(() => assert_equal("value", "value"))
    assert_throws(() => assert_equal("value", "other_value"), AssertionError)
  }

  "test asserts that two values are deeply equal"() {
    assert_not_throws(() => assert_equal({ key: "value" }, { key: "value" }))
    assert_throws(
      () => assert_equal({ key: "value" }, { key: "other_value" }),
      AssertionError
    )
  }
}

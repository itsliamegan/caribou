import { TestCase } from "contend"
import { assert, assert_not } from "contend/assertions"
import { EqualityMatcher } from "../../lib/matchers/equality_matcher"

export class EqualityMatcherTest extends TestCase {
  "test matches only if the actual is equal to the expected"() {
    let matcher = new EqualityMatcher("value")

    assert(matcher.matches("value"))
    assert_not(matcher.matches("other_value"))
  }

  "test matches if the values are deeply equal"() {
    let matcher = new EqualityMatcher({ key: "value" })

    assert(matcher.matches({ key: "value" }))
    assert_not(matcher.matches({ other_key: "other_value" }))
  }
}

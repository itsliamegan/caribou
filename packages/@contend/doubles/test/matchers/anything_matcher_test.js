import { TestCase } from "contend"
import { assert } from "contend/assertions"
import { AnythingMatcher } from "../../lib/matchers/anything_matcher"

export class AnythingMatcherTest extends TestCase {
  "test matches when given any value"() {
    let matcher = new AnythingMatcher()

    assert(matcher.matches("value"))
    assert(matcher.matches(false))
    assert(matcher.matches(null))
  }
}

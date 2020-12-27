import { TestCase } from "contend"
import { assert, assert_not } from "contend/assertions"
import { SequentialMatcher } from "../../lib/matchers/sequential_matcher"

export class SequentialMatcherTest extends TestCase {
  "test matches only when each of the values matches its corresponding matcher"() {
    let first_matcher = { matches(actual) { return actual === 1 } }
    let second_matcher = { matches(actual) { return actual === 2 } }
    let third_matcher = { matches(actual) { return actual === 3 } }
    let matchers = [first_matcher, second_matcher, third_matcher]

    let matcher = new SequentialMatcher(matchers)

    assert(matcher.matches([1, 2, 3]))
    assert_not(matcher.matches(["one", 2, 3]))
    assert_not(matcher.matches(["one", 2, "three"]))
    assert_not(matcher.matches([1, 2, 3, 4]))
    assert_not(matcher.matches([1, 2]))
  }
}

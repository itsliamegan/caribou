import { TestCase } from "contend"
import { assert, assert_not } from "contend/assertions"
import { ArgumentsMatcher } from "../../lib/matchers/arguments_matcher"

export class ArgumentsMatcherTest extends TestCase {
  "test matches only when each of the actuals is equal to the corresponding expected"() {
    let matcher = new ArgumentsMatcher([1, 2, 3])

    assert(matcher.matches([1, 2, 3]))
    assert_not(matcher.matches(["one", 2, 3]))
    assert_not(matcher.matches(["one", 2, "three"]))
    assert_not(matcher.matches([1, 2, 3, 4]))
    assert_not(matcher.matches([1, 2]))
  }
}

import { deep_equal } from "@contend/support"

export class EqualityMatcher {
  constructor(expected) {
    this.expected = expected
  }

  matches(actual) {
    return deep_equal(actual, this.expected)
  }
}

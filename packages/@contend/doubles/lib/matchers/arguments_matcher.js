import { EqualityMatcher } from "./equality_matcher"
import { SequentialMatcher } from "./sequential_matcher"

export class ArgumentsMatcher {
  constructor(expecteds) {
    this.expecteds = expecteds
  }

  matches(actuals) {
    return this.sequential_equality_matcher.matches(actuals)
  }

  get sequential_equality_matcher() {
    let equality_matchers = this.expecteds.map(expected =>
      new EqualityMatcher(expected)
    )

    return new SequentialMatcher(equality_matchers)
  }
}

export class SequentialMatcher {
  constructor(matchers) {
    this.matchers = matchers
  }

  matches(values) {
    if (values.length != this.matchers.length) return false

    for (let i = 0; i < this.matchers.length; i++) {
      let matcher = this.matchers[i]
      let value = values[i]

      if (!matcher.matches(value)) {
        return false
      }
    }

    return true
  }
}

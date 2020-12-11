import { AssertionError } from "./errors/assertion_error"

export function assert_not_throws(fn) {
  try {
    fn()
  } catch (error) {
    throw new AssertionError(
      `Expected function not to throw, but it threw ${error}`
    )
  }
}

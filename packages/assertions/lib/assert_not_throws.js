import { AssertionError } from "./errors/assertion_error"

export function assert_not_throws(fn) {
  let error

  try {
    fn()
  } catch (e) {
    error = e
  }

  if (error != undefined) {
    throw new AssertionError(
      `Expected function not to throw, but it threw ${error}`
    )
  }
}

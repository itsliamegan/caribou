import { AssertionError } from "./errors/assertion_error"

export function assert_throws(fn, error_type) {
  let error

  try {
    fn()
  } catch (e) {
    error = e
  }

  if (error == undefined) {
    throw new AssertionError(
      `Expected function to throw ${error_type.name}, but it didn't`
    )
  }

  if (!(error instanceof error_type)) {
    throw new AssertionError(
      `Expected function to throw ${error_type.name}, but it threw ${error}`
    )
  }
}

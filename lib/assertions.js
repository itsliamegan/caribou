import { deep_equal } from "./support/deep_equal"
import { literal_print } from "./support/literal_print"
import { AssertionError } from "./errors/assertion_error"

export function assert(condition, message) {
  if (!message) {
    message = `Expected ${literal_print(condition)} to be truthy`
  }

  if (!condition) {
    throw new AssertionError(message)
  }
}

export function assert_not(condition) {
  assert(!condition, `Expected ${literal_print(condition)} to be falsey`)
}

export function assert_equal(expected, actual) {
  assert(
    deep_equal(expected, actual),
    `Expected ${literal_print(actual)} to equal ${literal_print(expected)}`
  )
}

export function assert_not_equal(expected, actual) {
  assert(
    !deep_equal(expected, actual),
    `Expected ${literal_print(actual)} not to equal ${literal_print(expected)}`
  )
}

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

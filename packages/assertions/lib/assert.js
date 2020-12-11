import { literal_print } from "@contend/support"
import { AssertionError } from "./errors/assertion_error"

export function assert(condition, message) {
  if (!message) {
    message = `Expected ${literal_print(condition)} to be truthy`
  }

  if (!condition) {
    throw new AssertionError(message)
  }
}

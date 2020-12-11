import { deep_equal, literal_print } from "@contend/support"
import { assert } from "./assert"

export function assert_not_equal(expected, actual) {
  assert(
    !deep_equal(expected, actual),
    `Expected ${literal_print(actual)} not to equal ${literal_print(expected)}`
  )
}

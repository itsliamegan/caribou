import { literal_print } from "@contend/support"
import { assert } from "./assert"

export function assert_undefined(value) {
  assert(
    value === undefined,
    `Expected ${literal_print(value)} to be undefined`
  )
}

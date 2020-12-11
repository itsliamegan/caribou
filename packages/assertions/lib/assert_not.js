import { literal_print } from "@contend/support"
import { assert } from "./assert"

export function assert_not(condition) {
  assert(!condition, `Expected ${literal_print(condition)} to be falsey`)
}

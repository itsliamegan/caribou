import { TestCase } from "../.."
import { assert_equal } from "../../lib/assertions"
import { literal_print } from "../../lib/support/literal_print"

export class LiteralPrintTest extends TestCase {
  "test literal_print"() {
    assert_equal('"string"', literal_print("string"))
    assert_equal("1", literal_print(1))
    assert_equal("true", literal_print(true))
    assert_equal("null", literal_print(null))
    assert_equal("undefined", literal_print(undefined))
    assert_equal('[1, true, "three"]', literal_print([1, true, "three"]))
  }
}

import { TestCase } from "../.."
import { literal_print } from "../../lib/support/literal_print"

export class LiteralPrintTest extends TestCase {
  "test literal_print"() {
    this.assert_equal('"string"', literal_print("string"))
    this.assert_equal("1", literal_print(1))
    this.assert_equal("true", literal_print(true))
    this.assert_equal("null", literal_print(null))
    this.assert_equal("undefined", literal_print(undefined))
    this.assert_equal('[1, true, "three"]', literal_print([1, true, "three"]))
  }
}

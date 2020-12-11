import { TestCase } from "../.."
import { literal_print } from "../../lib/support/literal_print"

export class LiteralPrintTest extends TestCase {
  "test literal_print"() {
    this.assertEqual('"string"', literal_print("string"))
    this.assertEqual("1", literal_print(1))
    this.assertEqual("true", literal_print(true))
    this.assertEqual("null", literal_print(null))
    this.assertEqual("undefined", literal_print(undefined))
    this.assertEqual('[1, true, "three"]', literal_print([1, true, "three"]))
  }
}

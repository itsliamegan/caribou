import { TestCase } from "../.."
import { literalPrint } from "../../lib/support/literal_print"

export class LiteralPrintTest extends TestCase {
  "test literalPrint"() {
    this.assertEqual('"string"', literalPrint("string"))
    this.assertEqual("1", literalPrint(1))
    this.assertEqual("true", literalPrint(true))
    this.assertEqual("null", literalPrint(null))
    this.assertEqual("undefined", literalPrint(undefined))
    this.assertEqual('[1, true, "three"]', literalPrint([1, true, "three"]))
  }
}

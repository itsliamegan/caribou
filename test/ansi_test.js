import { TestCase } from ".."
import { ANSI } from "../src/ansi"
import { Color } from "../src/color"

export class ANSITest extends TestCase {
  "test foregroundFor"() {
    this.assertEqual(ANSI.foreground.white, ANSI.foregroundFor(Color.white))
    this.assertEqual(ANSI.foreground.red, ANSI.foregroundFor(Color.red))
    this.assertEqual(ANSI.foreground.green, ANSI.foregroundFor(Color.green))
  }

  "test backgroundFor"() {
    this.assertEqual(ANSI.background.white, ANSI.backgroundFor(Color.white))
    this.assertEqual(ANSI.background.red, ANSI.backgroundFor(Color.red))
    this.assertEqual(ANSI.background.green, ANSI.backgroundFor(Color.green))
  }
}

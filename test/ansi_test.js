import { TestCase } from ".."
import { ANSI } from "../lib/ansi"
import { Color } from "../lib/color"

export class ANSITest extends TestCase {
  "test foreground_for"() {
    this.assertEqual(ANSI.foreground.white, ANSI.foreground_for(Color.white))
    this.assertEqual(ANSI.foreground.red, ANSI.foreground_for(Color.red))
    this.assertEqual(ANSI.foreground.green, ANSI.foreground_for(Color.green))
  }

  "test background_for"() {
    this.assertEqual(ANSI.background.white, ANSI.background_for(Color.white))
    this.assertEqual(ANSI.background.red, ANSI.background_for(Color.red))
    this.assertEqual(ANSI.background.green, ANSI.background_for(Color.green))
  }
}

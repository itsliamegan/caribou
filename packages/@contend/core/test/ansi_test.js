import { TestCase } from "contend"
import { assert_equal } from "contend/assertions"
import { ANSI } from "../lib/ansi"
import { Color } from "../lib/color"

export class ANSITest extends TestCase {
  "test foreground_for"() {
    assert_equal(ANSI.foreground.white, ANSI.foreground_for(Color.white))
    assert_equal(ANSI.foreground.red, ANSI.foreground_for(Color.red))
    assert_equal(ANSI.foreground.green, ANSI.foreground_for(Color.green))
  }

  "test background_for"() {
    assert_equal(ANSI.background.white, ANSI.background_for(Color.white))
    assert_equal(ANSI.background.red, ANSI.background_for(Color.red))
    assert_equal(ANSI.background.green, ANSI.background_for(Color.green))
  }
}

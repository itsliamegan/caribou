import { TestCase, mock, stub } from ".."
import { StdoutSink } from "../src/stdout_sink"
import { Color } from "../src/color"
import { ANSI } from "../src/ansi"

export class StdoutSinkTest extends TestCase {
  "test write"() {
    let stdout = mock("stdout")
    stdout.expects("write").with("message")
    let sink = new StdoutSink(stdout)

    sink.write("message")

    stdout.verify()
  }

  "test write with a foreground color"() {
    let color = Color.red
    let stdout = mock("stdout")
    stdout.expects("write").with(`${ANSI.foregroundFor(color)}message${ANSI.reset}`)
    let sink = new StdoutSink(stdout)

    sink.write("message", { foreground: color })

    stdout.verify()
  }

  "test write with a background color"() {
    let color = Color.red
    let stdout = mock("stdout")
    stdout.expects("write").with(`${ANSI.backgroundFor(color)}message${ANSI.reset}`)
    let sink = new StdoutSink(stdout)

    sink.write("message", { background: color })

    stdout.verify()
  }

  "test write with both a foreground and a background color"() {
    let foreground = Color.red
    let background = Color.green
    let stdout = mock("stdout")
    stdout
      .expects("write")
      .with(
        `${ANSI.backgroundFor(background)}${ANSI.foregroundFor(foreground)}message${ANSI.reset}`
      )
    let sink = new StdoutSink(stdout)

    sink.write("message", { foreground, background })

    stdout.verify()
  }
}

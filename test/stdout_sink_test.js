import { TestCase } from ".."
import { mock } from "../lib/doubles"
import { StdoutSink } from "../lib/stdout_sink"
import { Color } from "../lib/color"
import { ANSI } from "../lib/ansi"

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
    stdout.expects("write").with(`${ANSI.foreground_for(color)}message${ANSI.reset}`)
    let sink = new StdoutSink(stdout)

    sink.write("message", { foreground: color })

    stdout.verify()
  }

  "test write with a background color"() {
    let color = Color.red
    let stdout = mock("stdout")
    stdout.expects("write").with(`${ANSI.background_for(color)}message${ANSI.reset}`)
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
        `${ANSI.background_for(background)}${ANSI.foreground_for(foreground)}message${ANSI.reset}`
      )
    let sink = new StdoutSink(stdout)

    sink.write("message", { foreground, background })

    stdout.verify()
  }
}

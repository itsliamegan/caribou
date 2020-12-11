import { ANSI } from "./ansi"

export class StdoutSink {
  constructor(stdout) {
    this.stdout = stdout
  }

  write(message, options = {}) {
    let { foreground, background } = options

    if (foreground) {
      message = ANSI.foregroundFor(foreground) + message
    }

    if (background) {
      message = ANSI.backgroundFor(background) + message
    }

    let hasColor = foreground || background

    if (hasColor) {
      message += ANSI.reset
    }

    this.stdout.write(message)
  }
}

import { ANSI } from "./ansi"

export class StdoutSink {
  constructor(stdout) {
    this.stdout = stdout
  }

  write(message, options = {}) {
    let { foreground, background } = options

    if (foreground) {
      message = ANSI.foreground_for(foreground) + message
    }

    if (background) {
      message = ANSI.background_for(background) + message
    }

    let has_color = foreground || background

    if (has_color) {
      message += ANSI.reset
    }

    this.stdout.write(message)
  }
}

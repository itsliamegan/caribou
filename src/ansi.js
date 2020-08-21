export class ANSI {
  static reset = "\u001b[0m"

  static foreground = {
    white: "\u001b[37m",
    black: "\u001b[30m",
    red: "\u001b[31m",
    green: "\u001b[32m"
  }

  static background = {
    white: "\u001b[47m",
    black: "\u001b[40m",
    red: "\u001b[41m",
    green: "\u001b[42m"
  }

  static foregroundFor(color) {
    switch (true) {
      case color.isWhite: return ANSI.foreground.white
      case color.isBlack: return ANSI.foreground.black
      case color.isRed: return ANSI.foreground.red
      case color.isGreen: return ANSI.foreground.green
    }
  }

  static backgroundFor(color) {
    switch (true) {
      case color.isWhite: return ANSI.background.white
      case color.isBlack: return ANSI.background.black
      case color.isRed: return ANSI.background.red
      case color.isGreen: return ANSI.background.green
    }
  }
}

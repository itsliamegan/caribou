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

  static foreground_for(color) {
    switch (true) {
      case color.is_white: return ANSI.foreground.white
      case color.is_black: return ANSI.foreground.black
      case color.is_red: return ANSI.foreground.red
      case color.is_green: return ANSI.foreground.green
    }
  }

  static background_for(color) {
    switch (true) {
      case color.is_white: return ANSI.background.white
      case color.is_black: return ANSI.background.black
      case color.is_red: return ANSI.background.red
      case color.is_green: return ANSI.background.green
    }
  }
}

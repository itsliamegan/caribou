export class Color {
  static white = Color.rgb(255, 255, 255)
  static black = Color.rgb(0, 0, 0)
  static red = Color.rgb(255, 0, 0)
  static green = Color.rgb(0, 255, 0)

  static rgb(red, green, blue) {
    return new Color(red, green, blue)
  }

  constructor(red, green, blue) {
    this.red = red
    this.green = green
    this.blue = blue
  }

  get is_white() {
    return this.red == 255 && this.green == 255 && this.blue == 255
  }

  get is_black() {
    return this.red == 0 && this.green == 0 && this.blue == 0
  }

  get is_red() {
    return this.red == 255 && this.green == 0 && this.blue == 0
  }

  get is_green() {
    return this.red == 0 && this.green == 255 && this.blue == 0
  }
}

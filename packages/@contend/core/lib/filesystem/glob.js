import glob from "fast-glob"
import path from "path"

export class Glob {
  constructor(cwd, pattern) {
    this.cwd = cwd
    this.pattern = pattern
  }

  filenames() {
    return glob(this.absolute_pattern)
  }

  get absolute_pattern() {
    return path.resolve(this.cwd, this.pattern)
  }
}

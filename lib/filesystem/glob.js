import globby from "globby"
import path from "path"

export class Glob {
  constructor(cwd, pattern) {
    this.cwd = cwd
    this.pattern = pattern
  }

  filenames() {
    return globby(this.absolutePattern)
  }

  get absolutePattern() {
    return path.resolve(this.cwd, this.pattern)
  }
}

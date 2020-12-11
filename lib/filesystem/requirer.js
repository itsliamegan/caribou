export class Requirer {
  constructor(filenames) {
    this.filenames = filenames
  }

  get exports() {
    return this.namedExports.concat(this.defaultExports)
  }

  get namedExports() {
    return this
      .allExports
      .filter(this.hasNamedExports)
      .flatMap(exports => Object.values(exports))
  }

  get defaultExports() {
    return this
      .allExports
      .filter(this.hasDefaultExport)
      .map(exports => exports.default)
  }

  get allExports() {
    return this.filenames.map(filename => require(filename))
  }

  hasNamedExports(exports) {
    return !("default" in exports)
  }

  hasDefaultExport(exports) {
    return "default" in exports
  }
}

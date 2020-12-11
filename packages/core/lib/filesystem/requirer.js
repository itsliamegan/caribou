export class Requirer {
  constructor(filenames) {
    this.filenames = filenames
  }

  get exports() {
    return this.named_exports.concat(this.default_exports)
  }

  get named_exports() {
    return this
      .all_exports
      .filter(this.has_named_exports)
      .map(exports => Object.values(exports))
      .flat()
  }

  get default_exports() {
    return this
      .all_exports
      .filter(this.has_default_export)
      .map(exports => exports.default)
  }

  get all_exports() {
    return this.filenames.map(filename => require(filename))
  }

  has_named_exports(exports) {
    return !("default" in exports)
  }

  has_default_export(exports) {
    return "default" in exports
  }
}

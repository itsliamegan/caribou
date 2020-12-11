import path from "path"
import { TestCase } from "contend"
import { assert } from "contend/assertions"
import { Requirer } from "../../lib/filesystem/requirer"

export class RequirerTest extends TestCase {
  "test exports"() {
    let filenames = [
      path.resolve(__dirname, "example/export1.js"),
      path.resolve(__dirname, "example/export2.js"),
      path.resolve(__dirname, "example/exportdefault.js"),
    ]
    let requirer = new Requirer(filenames)

    let exports = requirer.exports

    assert(exports.includes(1))
    assert(exports.includes(2))
    assert(exports.includes("default"))
  }
}

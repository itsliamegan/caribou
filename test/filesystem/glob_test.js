import path from "path"
import { TestCase } from "../.."
import { Glob } from "../../lib/filesystem/glob"

export class GlobTest extends TestCase {
  async "test filenames"() {
    let glob = new Glob(__dirname, "example/**/file*")

    let files = await glob.filenames()
    let expectedFiles = [
      path.resolve(__dirname, "example/file1"),
      path.resolve(__dirname, "example/file2"),
      path.resolve(__dirname, "example/subdirectory/file1"),
    ]

    this.assertEqual(expectedFiles, files)
  }
}

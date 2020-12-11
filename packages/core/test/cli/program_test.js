import { TestCase } from "@contend/core"
import { assert_equal } from "@contend/assertions"
import { stub } from "@contend/doubles"
import { Program } from "../../lib/cli/program"

export class ProgramTest extends TestCase {
  "test arguments"() {
    let cwd = ""
    let argv = ["first", "second", "third"]
    let stdin = stub("stdin")
    let stdout = stub("stdout")
    let program = new Program(cwd, argv, stdin, stdout)

    assert_equal(["third"], program.arguments)
  }

  "test arguments when there are no additional arguments"() {
    let cwd = ""
    let argv = ["first", "second"]
    let stdin = stub("stdin")
    let stdout = stub("stdin")
    let program = new Program(cwd, argv, stdin, stdout)

    assert_equal([], program.arguments)
  }
}

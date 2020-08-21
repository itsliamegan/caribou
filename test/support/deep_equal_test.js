import { TestCase } from "../.."
import { deepEqual } from "../../src/support/deep_equal"

export class DeepEqualTest extends TestCase {
  "test deepEqual primitives of the same"() {
    this.assert(deepEqual("value", "value"))
    this.assert(!deepEqual("value", "different"))
  }

  "test deepEqual primitives of different types"() {
    this.assert(!deepEqual("1", 1))
  }

  "test deepEqual arrays"() {
    let array = [["first", "second"], 2, "2", [["item"]]]
    let same = [["first", "second"], 2, "2", [["item"]]]
    let different = [["first"], "2", "item"]

    this.assert(deepEqual(array, same))
    this.assert(!deepEqual(array, different))
  }

  "test deepEqual objects"() {
    let object = {
      key: { key: { nested: "value" }, other: "value" },
      other: "value",
    }
    let same = {
      key: { key: { nested: "value" }, other: "value" },
      other: "value",
    }
    let different = {
      key: { nested: "value", additional: "other" },
      additional: "value",
    }

    this.assert(deepEqual(object, same))
    this.assert(!deepEqual(object, different))
  }
}

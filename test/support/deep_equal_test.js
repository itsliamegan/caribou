import { TestCase } from "../.."
import { deep_equal } from "../../lib/support/deep_equal"

export class DeepEqualTest extends TestCase {
  "test deep_equal primitives of the same"() {
    this.assert(deep_equal("value", "value"))
    this.assert(!deep_equal("value", "different"))
  }

  "test deep_equal primitives of different types"() {
    this.assert(!deep_equal("1", 1))
  }

  "test deep_equal arrays"() {
    let array = [["first", "second"], 2, "2", [["item"]]]
    let same = [["first", "second"], 2, "2", [["item"]]]
    let different = [["first"], "2", "item"]

    this.assert(deep_equal(array, same))
    this.assert(!deep_equal(array, different))
  }

  "test deep_equal objects"() {
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

    this.assert(deep_equal(object, same))
    this.assert(!deep_equal(object, different))
  }
}

import { TestCase } from "../.."
import { assert } from "../../lib/assertions"
import { deep_equal } from "../../lib/support/deep_equal"

export class DeepEqualTest extends TestCase {
  "test deep_equal primitives of the same"() {
    assert(deep_equal("value", "value"))
    assert(!deep_equal("value", "different"))
  }

  "test deep_equal primitives of different types"() {
    assert(!deep_equal("1", 1))
  }

  "test deep_equal arrays"() {
    let array = [["first", "second"], 2, "2", [["item"]]]
    let same = [["first", "second"], 2, "2", [["item"]]]
    let different = [["first"], "2", "item"]

    assert(deep_equal(array, same))
    assert(!deep_equal(array, different))
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

    assert(deep_equal(object, same))
    assert(!deep_equal(object, different))
  }
}

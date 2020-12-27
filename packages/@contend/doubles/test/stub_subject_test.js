import { TestCase } from "contend"
import { assert_equal } from "contend/assertions"
import { StubSubject } from "../lib/stub_subject"

export class StubSubjectTest extends TestCase {
  "test wraps access to a property on an object"() {
    let object = {}

    let stub_subject = new StubSubject(object)
    stub_subject.wrap("property", "value")

    assert_equal("value", object.property)
  }

  "test unwraps a property and sets it back to its original value"() {
    let object = { property: "original" }

    let stub_subject = new StubSubject(object)
    stub_subject.wrap("property", "wrapped")
    stub_subject.unwrap("property")

    assert_equal("original", object.property)
  }

  "test allows overriding of property values"() {
    let object = {}

    let stub_subject = new StubSubject(object)
    stub_subject.wrap("property", "wrapped")
    object.property = "overridden"

    assert_equal("overridden", object.property)
  }

  "test unwraps overriden property value"() {
    let object = { property: "original" }

    let stub_subject = new StubSubject(object)
    stub_subject.wrap("property", "wrapped")
    object.property = "overridden"
    stub_subject.unwrap("property")

    assert_equal("original", object.property)
  }
}

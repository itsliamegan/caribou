import { TestCase } from "contend"
import { assert_equal } from "contend/assertions"
import { Event } from "../lib/event"

export class EventTest extends TestCase {
  "test type"() {
    class ExampleEvent extends Event {}
    let event = new ExampleEvent()

    assert_equal(ExampleEvent, event.type)
  }
}

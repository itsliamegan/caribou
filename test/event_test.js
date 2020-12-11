import { TestCase } from ".."
import { assert_equal } from "../lib/assertions"
import { Event } from "../lib/event"

export class EventTest extends TestCase {
  "test type"() {
    class ExampleEvent extends Event {}
    let event = new ExampleEvent()

    assert_equal(ExampleEvent, event.type)
  }
}

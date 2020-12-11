import { TestCase } from ".."
import { Event } from "../lib/event"

export class EventTest extends TestCase {
  "test type"() {
    class ExampleEvent extends Event {}
    let event = new ExampleEvent()

    this.assert_equal(ExampleEvent, event.type)
  }
}

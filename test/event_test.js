import { TestCase } from ".."
import { Event } from "../lib/event"

export class EventTest extends TestCase {
  "test type"() {
    class ExampleEvent extends Event {}
    let event = new ExampleEvent()

    this.assertEqual(ExampleEvent, event.type)
  }
}

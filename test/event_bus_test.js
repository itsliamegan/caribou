import { TestCase, mock } from ".."
import { EventBus } from "../src/event_bus"
import { Event } from "../src/event"

export class EventBusTest extends TestCase {
  "test notifies listeners when events they are listening to are posted"() {
    class ExampleEvent extends Event {}
    let event = new ExampleEvent()
    let bus = new EventBus()
    let listener = mock("listener")
    listener.expects("received").with(event)

    bus.register(ExampleEvent, listener)
    bus.post(event)

    listener.verify()
  }
}
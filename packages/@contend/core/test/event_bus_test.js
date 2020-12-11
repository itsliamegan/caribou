import { TestCase } from "@contend/core"
import { mock } from "@contend/doubles"
import { EventBus } from "../lib/event_bus"
import { Event } from "../lib/event"

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

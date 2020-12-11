export class EventBus {
  constructor() {
    this.listeners = new Map()
  }

  register(event_type, listener) {
    if (this.has_no_listeners_for(event_type)) {
      this.setup_initial_listeners_for(event_type)
    }

    this.add_listener(event_type, listener)
  }

  post(event) {
    this.notify_listeners_of(event)
  }

  add_listener(event_type, listener) {
    this.listeners_for(event_type).push(listener)
  }

  notify_listeners_of(event) {
    for (let listener of this.listeners_for(event.type)) {
      listener.received(event)
    }
  }

  setup_initial_listeners_for(event_type) {
    this.listeners.set(event_type, [])
  }

  listeners_for(event_type) {
    return this.listeners.get(event_type)
  }

  has_no_listeners_for(event_type) {
    return !this.listeners.has(event_type)
  }
}

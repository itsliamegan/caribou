export class EventBus {
  constructor() {
    this.listeners = new Map()
  }

  register(eventType, listener) {
    if (this.noListenersFor(eventType)) {
      this.setupInitialListenersFor(eventType)
    }

    this.addListener(eventType, listener)
  }

  post(event) {
    this.notifyListenersOf(event)
  }

  addListener(eventType, listener) {
    this.listenersFor(eventType).push(listener)
  }

  notifyListenersOf(event) {
    for (let listener of this.listenersFor(event.type)) {
      listener.received(event)
    }
  }

  setupInitialListenersFor(eventType) {
    this.listeners.set(eventType, [])
  }

  listenersFor(eventType) {
    return this.listeners.get(eventType)
  }

  noListenersFor(eventType) {
    return !this.listeners.has(eventType)
  }
}

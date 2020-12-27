import { MethodDefinition } from "./method_definition"
import { Invocation } from "./invocation"

export class InvocationTrackingMethodDefinition extends MethodDefinition {
  constructor(stub, method, tracker) {
    super(stub, method)

    this.tracker = tracker
  }

  implementation(...args) {
    this.tracker.add_invocation(
      new Invocation(this.stub.subject, this.method, args)
    )

    return super.implementation(...args)
  }
}

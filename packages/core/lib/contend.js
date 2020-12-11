import { Program } from "./cli/program"
import { EventBus } from "./event_bus"
import { Reporter } from "./reporter"
import { StdoutSink } from "./stdout_sink"
import { Runner } from "./runner"
import { Glob } from "./filesystem/glob"

export class Contend extends Program {
  async run() {
    let bus = new EventBus()
    let sink = new StdoutSink(this.stdout)
    let reporter = new Reporter(bus, sink)
    let glob = new Glob(this.cwd, this.test_pattern)
    let runner = new Runner(bus, reporter, glob)

    await runner.run()
  }

  get test_pattern() {
    return this.arguments[0] || "test/**/*_test.js"
  }
}

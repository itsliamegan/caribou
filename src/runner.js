import { Requirer } from "./filesystem/requirer"
import { Instantiator } from "./instantiator"

export class Runner {
  constructor(bus, reporter, glob) {
    this.bus = bus
    this.reporter = reporter
    this.glob = glob
  }

  async run() {
    this.reporter.listen()

    let filenames = await this.glob.filenames()
    let requirer = new Requirer(filenames)

    let classes = requirer.exports
    let instantiator = new Instantiator(this.bus, classes)

    let suite = instantiator.suite
    await suite.run()
  }
}

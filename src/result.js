export class Result {
  static passed(scenario) {
    return new PassedResult(scenario)
  }

  static failed(scenario, message) {
    return new FailedResult(scenario, message)
  }

  constructor(scenario, message) {
    this.scenario = scenario
    this.message = message
  }

  get name() {
    return this.scenario.name
  }
}

class PassedResult extends Result {
  get passed() {
    return true
  }

  get failed() {
    return false
  }
}

class FailedResult extends Result {
  get passed() {
    return false
  }

  get failed() {
    return true
  }
}

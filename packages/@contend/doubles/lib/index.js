import { Mock } from "./mock"
import { Stub } from "./stub"

export function mock(name_or_klass) {
  if (typeof name_or_klass == "function") {
    let klass = name_or_klass
    let descriptor = klass.name

    return new Mock(descriptor, klass)
  } else {
    let name = name_or_klass
    let descriptor = `mock("${name}")`

    return new Mock(descriptor)
  }
}

export function stub(name_or_klass) {
  if (typeof name_or_klass == "function") {
    let klass = name_or_klass
    let descriptor = klass.name

    return new Stub(descriptor, klass)
  } else {
    let name = name_or_klass
    let descriptor = `stub("${name}")`

    return new Stub(descriptor)
  }
}

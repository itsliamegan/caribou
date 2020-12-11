import { InstanceMock } from "./instance_mock"
import { ClassMock } from "./class_mock"
import { InstanceStub } from "./instance_stub"
import { ClassStub } from "./class_stub"

export function mock(name_or_class) {
  let should_mock_class = typeof name_or_class == "function"

  if (should_mock_class) {
    let klass = name_or_class
    return new ClassMock(klass)
  } else {
    let name = name_or_class
    return new InstanceMock(name)
  }
}

export function stub(name_or_class) {
  let should_stub_class = typeof name_or_class == "function"

  if (should_stub_class) {
    let klass = name_or_class
    return new ClassStub(klass)
  } else {
    let name = name_or_class
    return new InstanceStub(name)
  }
}

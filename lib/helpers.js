import { InstanceMock } from "./instance_mock"
import { ClassMock } from "./class_mock"
import { InstanceStub } from "./instance_stub"
import { ClassStub } from "./class_stub"

export function mock(nameOrClass) {
  let shouldMockClass = typeof nameOrClass == "function"

  if (shouldMockClass) {
    let klass = nameOrClass
    return new ClassMock(klass)
  } else {
    let name = nameOrClass
    return new InstanceMock(name)
  }
}

export function stub(nameOrClass) {
  let shouldStubClass = typeof nameOrClass == "function"

  if (shouldStubClass) {
    let klass = nameOrClass
    return new ClassStub(klass)
  } else {
    let name = nameOrClass
    return new InstanceStub(name)
  }
}

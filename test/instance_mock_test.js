import { TestCase } from "../lib"
import { InstanceMock } from "../lib/instance_mock"
import { AssertionError } from "../lib/errors/assertion_error"

export class InstanceMockTest extends TestCase {
  "test expecting a method stubs that method"() {
    let mock = new InstanceMock("mock")

    mock.expects("method").returns("value")

    this.assert_equal("value", mock.method())
  }

  "test expecting a method multiple times uses the last return value"() {
    let mock = new InstanceMock("mock")

    mock.expects("method").returns("first")
    mock.expects("method").returns("second")
    mock.expects("method").returns("third")

    this.assert_equal("third", mock.method())
  }

  "test verifies that a method was called"() {
    let called = new InstanceMock("called")
    let uncalled = new InstanceMock("uncalled")

    called.expects("method")
    uncalled.expects("method")
    called.method()

    this.assert(called.satisfied)
    this.assert(uncalled.unsatisfied)
  }

  "test verifies that a method was called with any args by default"() {
    let calledWithNoArgs = new InstanceMock("calledWithNoArgs")
    let calledWithSomeArgs = new InstanceMock("calledWithSomeArgs")

    calledWithNoArgs.expects("method")
    calledWithSomeArgs.expects("method")
    calledWithNoArgs.method()
    calledWithSomeArgs.method("arg", "arg")

    this.assert(calledWithNoArgs.satisfied)
    this.assert(calledWithSomeArgs.satisfied)
    this.assert_not(calledWithNoArgs.receivedUnexpectedInvocation)
    this.assert_not(calledWithSomeArgs.receivedUnexpectedInvocation)
  }

  "test verifies that a method was called with specific args"() {
    let calledWithNoArgs = new InstanceMock("calledWithNoArgs")
    let calledWithIncorrectArgs = new InstanceMock("calledWithIncorrectArgs")
    let calledWithCorrectArgs = new InstanceMock("calledWithCorrectArgs")

    calledWithNoArgs.expects("method").with("arg1", "arg2")
    calledWithIncorrectArgs.expects("method").with("arg1", "arg2")
    calledWithCorrectArgs.expects("method").with("arg1", "arg2")
    calledWithNoArgs.method()
    calledWithIncorrectArgs.method("arg")
    calledWithCorrectArgs.method("arg1", "arg2")

    this.assert(calledWithNoArgs.unsatisfied)
    this.assert(calledWithIncorrectArgs.unsatisfied)
    this.assert(calledWithCorrectArgs.satisfied)
  }

  "test verifies that a method was called multiple times with different args"() {
    let notCalled = new InstanceMock("notCalled")
    let calledOnce = new InstanceMock("calledOnce")
    let calledTwice = new InstanceMock("calledTwice")

    notCalled.expects("method").with("arg1")
    notCalled.expects("method").with("arg2")
    calledOnce.expects("method").with("arg1")
    calledOnce.expects("method").with("arg2")
    calledTwice.expects("method").with("arg1")
    calledTwice.expects("method").with("arg2")
    calledOnce.method("arg1")
    calledTwice.method("arg1")
    calledTwice.method("arg2")

    this.assert(notCalled.unsatisfied)
    this.assert(calledOnce.unsatisfied)
    this.assert(calledTwice.satisfied)
  }

  "test verifies that a method was only called with the correct args"() {
    let mock = new InstanceMock("mock")

    mock.expects("method").with("arg")
    mock.method("arg")
    mock.method()

    this.assert(mock.received_unexpected_invocation)
  }

  "test throws an error when verified if it's unsatisfied"() {
    let satisfied = new InstanceMock("satisfied")
    let unsatisfied = new InstanceMock("unsatisfied")

    satisfied.expects("method")
    unsatisfied.expects("method")
    satisfied.method()

    this.assert_not_throws(() => satisfied.verify())
    this.assert_throws(() => unsatisfied.verify(), AssertionError)
  }
}

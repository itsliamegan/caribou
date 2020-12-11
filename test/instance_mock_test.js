import { TestCase } from ".."
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
    let called_with_no_args = new InstanceMock("called_with_no_args")
    let called_with_some_args = new InstanceMock("called_with_some_args")

    called_with_no_args.expects("method")
    called_with_some_args.expects("method")
    called_with_no_args.method()
    called_with_some_args.method("arg", "arg")

    this.assert(called_with_no_args.satisfied)
    this.assert(called_with_some_args.satisfied)
    this.assert_not(called_with_no_args.received_unexpected_invocation)
    this.assert_not(called_with_some_args.received_unexpected_invocation)
  }

  "test verifies that a method was called with specific args"() {
    let called_with_no_args = new InstanceMock("called_with_no_args")
    let called_with_incorrect_args = new InstanceMock("called_with_incorrect_args")
    let called_with_correct_args = new InstanceMock("called_with_correct_args")

    called_with_no_args.expects("method").with("arg1", "arg2")
    called_with_incorrect_args.expects("method").with("arg1", "arg2")
    called_with_correct_args.expects("method").with("arg1", "arg2")
    called_with_no_args.method()
    called_with_incorrect_args.method("arg")
    called_with_correct_args.method("arg1", "arg2")

    this.assert(called_with_no_args.unsatisfied)
    this.assert(called_with_incorrect_args.unsatisfied)
    this.assert(called_with_correct_args.satisfied)
  }

  "test verifies that a method was called multiple times with different args"() {
    let not_called = new InstanceMock("not_called")
    let called_once = new InstanceMock("called_once")
    let called_twice = new InstanceMock("called_twice")

    not_called.expects("method").with("arg1")
    not_called.expects("method").with("arg2")
    called_once.expects("method").with("arg1")
    called_once.expects("method").with("arg2")
    called_twice.expects("method").with("arg1")
    called_twice.expects("method").with("arg2")
    called_once.method("arg1")
    called_twice.method("arg1")
    called_twice.method("arg2")

    this.assert(not_called.unsatisfied)
    this.assert(called_once.unsatisfied)
    this.assert(called_twice.satisfied)
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

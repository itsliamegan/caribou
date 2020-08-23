import { TestCase } from "../src"
import { Mock } from "../src/mock"
import { AssertionError } from "../src/errors/assertion_error"

export class MockTest extends TestCase {
  "test expecting a method stubs that method"() {
    let mock = new Mock("mock")

    mock.expects("method").returns("value")

    this.assertEqual("value", mock.method())
  }

  "test expecting a method multiple times uses the last return value"() {
    let mock = new Mock("mock")

    mock.expects("method").returns("first")
    mock.expects("method").returns("second")
    mock.expects("method").returns("third")

    this.assertEqual("third", mock.method())
  }

  "test verifies that a method was called"() {
    let called = new Mock("called")
    let uncalled = new Mock("uncalled")

    called.expects("method")
    uncalled.expects("method")
    called.method()

    this.assert(called.satisfied)
    this.assert(uncalled.unsatisfied)
  }

  "test verifies that a method was called with any args by default"() {
    let calledWithNoArgs = new Mock("calledWithNoArgs")
    let calledWithSomeArgs = new Mock("calledWithSomeArgs")

    calledWithNoArgs.expects("method")
    calledWithSomeArgs.expects("method")

    calledWithNoArgs.method()
    calledWithSomeArgs.method("arg", "arg")

    this.assert(calledWithNoArgs.satisfied)
    this.assert(calledWithSomeArgs.satisfied)
    this.assertNot(calledWithNoArgs.receivedUnexpectedInvocation)
    this.assertNot(calledWithSomeArgs.receivedUnexpectedInvocation)
  }

  "test verifies that a method was called with specific args"() {
    let calledWithNoArgs = new Mock("calledWithNoArgs")
    let calledWithIncorrectArgs = new Mock("calledWithIncorrectArgs")
    let calledWithCorrectArgs = new Mock("calledWithCorrectArgs")

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
    let notCalled = new Mock("notCalled")
    let calledOnce = new Mock("calledOnce")
    let calledTwice = new Mock("calledTwice")

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
    let mock = new Mock("mock")

    mock.expects("method").with("arg")
    mock.method("arg")
    mock.method()

    this.assert(mock.receivedUnexpectedInvocation)
  }

  "test throws an error when verified if it's unsatisfied"() {
    let satisfied = new Mock("satisfied")
    let unsatisfied = new Mock("unsatisfied")

    satisfied.expects("method")
    unsatisfied.expects("method")
    satisfied.method()

    this.assertNotThrows(() => satisfied.verify())
    this.assertThrows(() => unsatisfied.verify(), AssertionError)
  }
}

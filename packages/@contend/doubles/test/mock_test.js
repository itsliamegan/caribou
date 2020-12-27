import { TestCase } from "contend"
import { assert_equal, assert_throws, assert_not_throws, AssertionError } from "contend/assertions"
import { Mock } from "../lib/mock"

export class MockTest extends TestCase {
  "test stubs properties and methods just like a Stub"() {
    let mock = new Mock("mock")
    mock.stubs.property("property").value("value")
    mock.stubs.method("method").returns("value")

    assert_equal("value", mock.property)
    assert_equal("value", mock.method())
  }

  "test mocked methods can return values"() {
    let mock = new Mock("mock")
    mock.expects("method").returns("value")

    assert_equal("value", mock.method())
  }

  "test verifies that a method was called"() {
    let called = new Mock("called")
    let uncalled = new Mock("uncalled")
    called.expects("method")
    uncalled.expects("method")
    called.method()

    assert_not_throws(() => called.verify())
    assert_throws(() => uncalled.verify(), AssertionError)
  }

  "test by default verifies with any arguments"() {
    let called_with_no_args = new Mock("called_with_no_args")
    let called_with_args = new Mock("called_with_args")
    called_with_no_args.expects("method")
    called_with_args.expects("method")
    called_with_no_args.method()
    called_with_args.method("arg")

    assert_not_throws(() => called_with_no_args.verify())
    assert_not_throws(() => called_with_args.verify())
  }

  "test verifies that a method was called with specific arguments"() {
    let called_with_correct_args = new Mock("called_with_correct_args")
    let called_with_incorrect_args = new Mock("called_with_incorrect_args")
    let uncalled = new Mock("uncalled")
    called_with_correct_args.expects("method").with("arg")
    uncalled.expects("method").with("arg")
    called_with_correct_args.method("arg")

    assert_not_throws(() => called_with_correct_args.verify())
    assert_throws(() => uncalled.verify(), AssertionError)
  }

  "test throws an AssertionError when receiving an unexpected invocation"() {
    let mock = new Mock("mock")
    mock.expects("method").with("arg")

    assert_throws(() => mock.method(), AssertionError)
  }
}

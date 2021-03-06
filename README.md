# Contend

An xUnit-style testing library for JavaScript. It's heavily opinionated and
provides a variety of built-in tools to avoid having to install and glue
together several third-party packages. It provides mechanisms to [define
tests](#defining-tests), [make assertions](#assertions), [hook into the test
lifecycle](#lifecycle-hooks), [create mocks and stubs](#mocks-and-stubs), and
test (limited) [functionality in the browser](#browser-testing).

If you're convinced, [install it](#installation) and [run some
tests](#running-tests). Check out some [examples](#examples) of Contend test
suites, or [contribute](#contributing).

In its current form, Contend is better suited for testing libraries rather than
dynamic, JavaScript-heavy applications. This is simply because, in the
JavaScript ecosystem, there are currently very few utilities provided for
testing these kinds of libraries, whereas there are plenty of utilities for
testing applications.

## Installation

Install it as a development dependency via your package manager of choice:

```
// npm
$ npm install --save-dev contend

// yarn
$ yarn add --dev contend
```

## Defining Tests

Contend, in the style of xUnit, defines tests as classes. They should be defined
in the "test/" directory at the root of your application. Though not required,
it's conventional to define isolated unit tests in the "test/unit" directory,
and tests that exercise the user-facing behavior in the "test/acceptance
directory. Each file should be called "{name}_test.js", where {name} is the name
of the class or function that you're testing. That file should export a class
that extends one of Contend's base `TestCase` classes. This class should be
named, in accordance with the file, {Name}Test, again where {Name} is the name
of the class or function that you're testing. To define specific scenarios for
your tests, create methods that start with the word "test". If you like naming
your test methods camel/snake case, then feel free to do so. However, since
methods are just properties on an object, and properties can be any string, we
can use a string to define the name of a test scenario method.

Below is an example of a typical test file.

`test/unit/array_test.js`:
```js
import { TestCase } from "contend"
import { assert_equal } from "contend/assertions"

export class ArrayTest extends TestCase {
  "test push and pop"() {
    let array = []

    array.push("element")
    let element = array.pop()

    assert_equal("element", element)
  }
}
```

## Running Tests

To run all the tests in your application, run the command without any arguments:

```
$ contend
```

To run a specific test, pass the test's filename as an argument:

```
# Run the test "test/unit/array_test.js"
$ contend test/unit/array_test.js
```

To run a group of tests, pass a
[glob](https://en.wikipedia.org/wiki/Glob_(programming)) as an argument:

```
# Run all the tests in the "test/unit" folder
$ contend test/unit/**/*_test.js
```

## Assertions

Contend currently doesn't provide a wide variety of assertions. It provides the
basic truth and equality checkers, as well as a couple more specialized ones. If
you feel any are missing, feel free to [contribute them](#contributing). Below
are a list of all the assertions, which are available to import from the
`contend/assertions` namespace.

* `assert(condition, [message])` Asserts that the given condition is truthy
* `assert_not(condition)` Asserts that the given condition is falsey
* `assert_equal(expected, actual)` Asserts that the expected is **deep equal**
  to the actual
* `assert_not_equal(expected, actual)` Asserts that the expected is not
  **deep equal** to the actual
* `assert_throws(fn, [error_type])` Asserts that the given function, when
  called, throws an error. If given an error type, asserts that the error raised
  is also an instance of the given error type
* `assert_not_throws(fn)` Asserts that the given function, when called, doesn't
  throw any errors
* `assert_undefined(value)` Asserts that the given value is strictly undefined,
  not any other falsey value

### Custom Assertions

If you need to have a custom assertion, possibly for a domain-specific
exception, feel free to define your own. Most of the time, you can define them
in terms of the basic `assert` or `assert_not`. If you can't (for example, an
assertion that isn't in terms of a basic boolean expression), do nothing in a
passing case, and throw an `AssertionError` in a failing case.

## Lifecycle Hooks

You can hook into the lifecycle of the test runs by defining `setup` and/or
`teardown` methods on your test classes. `setup` is run once before every test
scenario, and `teardown` is run once after every test scenario. **Bear in mind,
each scenario is run in a separate instance of the test class, so shared state
on the test instance will not persist between scenarios.**

```js
import { TestCase } from "contend"

export class LifecyclesTest extends TestCase {
  setup() {
    console.log("Called twice!")
  }

  teardown() {
    console.log("Called twice!")
  }

  "test first"() {
    // ...
  }

  "test second"() {
    // ...
  }
}
```

## Mocks and Stubs

Mocks and stubs are types of [test
doubles](https://martinfowler.com/bliki/TestDouble.html). You can use them to
test the components of your system in isolation from one another, ensuring that
messages are passed correctly.

Right now, Contend doesn't provide any built-ins for spies, but that might
change in the future.

### Stubs

Stubs are arguably the simplest type of test double, which just provide canned
answers for messages. You can stub both methods and properties with a similar
interface.

The basic syntax is as follows:

```js
import { stub } from "contend/doubles"

// Create a stub.
let person = stub("person")

// Stub a property.
person.stubs.property("name").value("John Smith")
person.name // "John Smith"

// Stub a method.
person.stubs.method("greet").returns("Hello, John Smith")
person.greet() // "Hello, John Smith"
```

### Mocks

Mocks verify that certain messages were received, optionally with certain
arguments.

The basic syntax is similar to that of a stub, but because you never need to
assert that properties were accessed, the `expects` method doesn't require you
to specify `property` or `method`:

```js
import { mock } from "contend/doubles"

// Expect that a method is called.
let door = mock("door")
door.expects("open")

// Calling "verify" here would raise an error because the "open" method hasn't
// been called.
// door.verify()

// The "open" method is called, so calling "verify" will not raise an error.
door.open()
door.verify()


// Expect that a method is called with specific arguments.
let cup = stub("cup")
cup.expects("fill").with(10)

// Calling "verify" here would raise an error because the "fill" method hasn't
// been called.
// cup.verify()

// Calling "verify" here would also raise an error, because while we haven't
// called the "fill" method with the correct arguments.
// cup.fill(5)
// cup.verify()

// The "fill" method is called with the correct arguments, so "verify" will not
// raise an error.
cup.fill(10)
cup.verify()
```

You can also use the `stubs` method on a mock:

```js
import { mock } from "contend/doubles"

// Stub a property on a mock
let train = mock("train")
train.stubs.property("number").value(500)
```

## Browser Testing

Contend provides limited features for browser testing using JSDOM. To use
browser utilities, instead of subclassing `TestCase`, subclass
`BrowserTestCase`. To define an HTML document that a test case interacts with,
define an `html` property on your test class.

The `window` and `document` will be available globally, and the DOM will be
reset after every test scenario.

There are utility methods available to all subclasses of `BrowserTestCase`:
* `element(selector)` Retrieves a single element using `document.querySelector`

Below is an example of creating a browser test.

```js
import { BrowserTestCase } from "contend"

export class TodoListTest extends BrowserTestCase {
  html = `
    <html>
      <body>
        <ul id="todo-list">
        </ul>

        <input id="new-todo" type="text">
        <button id="add-todo">Add</button>
      </body>
    </html>
  `

  "test adding items"() {
    let list = this.element("#todo-list")
    let add_button = this.element("#add-todo")
    let new_field = this.element("#new-todo")

    new_field.value = "New Todo"
    add_button.click()

    assert_equal(1, list.children.length)
  }
}
```

## Examples

* Contend's test suite is bootstrapped, meaning Contend is tested using itself.
  Look in the test/ directories of each package to see tests written using
  Contend.

## Contributing

If you spot a typo, encounter a bug, or have an idea for a feature, feel free to
open an issue or pull request.

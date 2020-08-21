# Caribou

Caribou is a JavaScript testing library. It's heavily opinionated and provides a variety of built-in tools to avoid having to install and glue together several third-party packages. It provides mechanisms to [define tests](#defining-tests), [make assertions](#assertions), [hook into the test lifecycle](#lifecycle-hooks), [create mocks and stubs](#mocks-and-stubs), and test (limited) [functionality in the browser](#browser-testing).

If you're convinced, [install it](#installation) and [run some tests](#running-tests)!

In its current form, it's better suited for testing libraries rather than dynamic, JavaScript-heavy applications. This is simply because there are currently very few utilities provided for testing these kinds of applications. Feel free to [contribute](#contributing)

## Installation

Install it as a development dependency via your package manager of choice:

```
$ npm install -D caribou
```

## Defining Tests

Caribou, in the style of xUnit, defines tests as classes. They should be defined in the "test/" folder at the root of your application. Though not required, it's conventional to define isolated unit tests in the "test/unit" folder, and tests that validate the collaboration between objects in the "test/integration" folder. Each file should be called "{name}_test.js", where {name} is the name of the class or function that you're testing. That file should export a class that extends one of Caribou's base `TestCase` classes. This class should be named, in accordance with the file, {Name}Test, again where {Name} is the name of the class or function that you're testing. To define specific scenarios for your tests, create methods that start with the word "test". If you like naming your test methods camel/snake case, then feel free to do so. However, since methods are just properties on an object, and properties can be any string, we can use a string to define the name of a test scenario method.

Below is an example of a typical test file.

```js
import { TestCase } from "caribou"

export class ArrayTest extends TestCase {
  "test push and pop"() {
    let array = []

    array.push("item")
    let item = array.pop()

    this.assertEqual("item", item)
  }
}
```

## Running Tests

To run all the tests in your application, run the command without any arguments:

```
$ ./node_modules/caribou/bin/caribou
```

To run a specific test, pass the test's filename as an argument:

```
# Run the test "test/unit/array_test.js"
$ ./node_modules/caribou/bin/caribou test/unit/array_test.js
```

To run a group of tests, pass a [glob](https://en.wikipedia.org/wiki/Glob_(programming)) as an argument:

```
# Run all the tests in the "test/unit" folder
$ ./node_modules/caribou/bin/caribou test/unit/**/*_test.js
```

## Assertions

Caribou currently doesn't provide a wide variety of assertions. It provides the basic truth and equality checkers, as well as a couple more specialized ones. If you feel any are missing, feel free to [contribute them](#contributing). Below are a list of all the assertions.

* `assert(condition, [message])` Asserts that the given condition is truthy
* `assertNot(condition)` Asserts that the given condition is falsey
* `assertEqual(expected, actual)` Asserts that the expected is **deep equal** to the actual
* `assertNotEqual(expected, actual)` Asserts that the expected is not **deep equal** to the actual
* `assertThrows(fn, errorType)` Asserts that the given function, when called, throws an instance of the given error type
* `assertNotThrows(fn)` Asserts that the given function, when called, doesn't throw any errors

### Custom Assertions

If you need to have a custom assertion, possibly for a domain-specific exception, feel free to define your own. Most of the time, you can define them in terms of the basic `assert` or `assertNot`. If you can't (for example, an assertion that isn't in terms of a basic boolean expression), do nothing in a passing case, and throw an `AssertionError` in a failing case.

## Lifecycle Hooks

You can hook into the lifecycle of the test runs by defining `setup` and/or `teardown` methods on your test classes. `setup` is run once before every test scenario, and `teardown` is run once after every test scenario.

```js
import { TestCase } from "caribou"

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

Mocks and stubs are types of [test doubles](https://martinfowler.com/bliki/TestDouble.html). You can use them to test the components of your system in isolation from one another, ensuring that messages are passed correctly.

Right now, Caribou doesn't provide any built-ins for spies, but that might change in the future.

### Stubs

Stubs are arguably the simplest type of test double, which just provide canned answers for messages. You can stub both methods and properties with a similar interface.

The basic syntax is as follows:

```js
import { stub } from "caribou"

// Create a stub.
let person = stub("person")

// Stub a property.
person.stubs.property("name").value("John Smith")
person.name // "John Smith"

// Stub a method.
person.stubs.method("toString").returns("Person: John Smith")
person.toString() // "Person: John Smith"
```

### Mocks

Mocks verify that certain messages were received, optionally with certain arguments.

The basic syntax is similar to that of a stub, but because you never need to assert that properties were accessed, the `expects` method doesn't require you to specify `property` or `method`:

```js
import { mock } from "caribou"

// Expect that a method is called.
let door = mock("door")
door.expects("open")

// Calling "verify" here would raise an error because the "open" method hasn't been called.
// door.verify()

// The "open" method is called, so this will not raise an error.
door.open()
door.verify()


// Expect that a method is called with specific arguments.
let cup = stub("cup")
cup.expects("fill").with(10)

// Calling "verify" here would raise an error because the "fill" method hasn't been called.
// cup.verify()

// Doing this would raise an error, because while we are calling the "fill" method, we're not calling it with the correct arguments.
// cup.fill(5)
// cup.verify()

// The "fill" method is called with the correct arguments, so this will not raise an error.
cup.fill(10)
cup.verify()
```

You can also use the `stubs` method on a mock:

```js
import { mock } from "caribou"

// Stub a property on a mock
let train = mock("train")
train.stubs.property("number").value(500)
```

## Browser Testing

Caribou provides limited features for browser testing using JSDOM. To use browser utilities, instead of subclassing `TestCase`, subclass `BrowserTestCase`. To define an HTML document that a test case interacts with, define an `html` property on your test class.

The `window` and `document` will be available globally, and the DOM will be reset after every test scenario.

Below is an example of creating a browser test.

```js
import { BrowserTestCase } from "caribou"

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
    let addButton = this.element("#add-todo")
    let newField = this.element("#new-todo")

    newField.value = "New Todo"
    addButton.click()

    this.assertEqual(1, list.children.length)
  }
}
```

# Contributing

If you spot a bug, have an idea for a feature, or anything else, feel free to open an issue or pull request.
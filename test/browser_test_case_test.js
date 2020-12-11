import { TestCase, stub } from ".."
import { assert_equal, assert_not_equal } from "../lib/assertions"
import { BrowserTestCase } from "../lib/browser_test_case"

export class BrowserTestCaseTest extends TestCase {
  async "test globally sets up a fake DOM"() {
    let global_window
    let global_document

    class ExampleBrowserTestCase extends BrowserTestCase {
      "test method"() {
        global_window = window
        global_document = document
      }
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let test = new ExampleBrowserTestCase(bus)

    await test.run()

    assert_not_equal(undefined, global_window)
    assert_not_equal(undefined, global_document)
  }

  async "test uses the html property to create the DOM"() {
    let paragraphs = []

    class ExampleBrowserTestCase extends BrowserTestCase {
      html = `
        <html>
          <body>
            <p></p>
            <p></p>
            <p></p>
          </body>
        </html>
      `

      "test method"() {
        paragraphs = Array.from(document.querySelectorAll("p"))
      }
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let test = new ExampleBrowserTestCase(bus)

    await test.run()

    assert_equal(3, paragraphs.length)
  }

  async "test queries for a single element"() {
    let element

    class ExampleBrowserTestCase extends BrowserTestCase {
      html = `
        <html>
          <body>
            <p id="element"></p>
          </body>
        </html>
      `

      "test method"() {
        element = this.element("#element")
      }
    }
    let bus = stub("bus")
    bus.stubs.method("post")
    let test = new ExampleBrowserTestCase(bus)

    await test.run()

    assert_equal("element", element.id)
  }
}

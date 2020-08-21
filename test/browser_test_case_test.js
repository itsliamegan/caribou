import { TestCase, stub } from ".."
import { BrowserTestCase } from "../src/browser_test_case"

export class BrowserTestCaseTest extends TestCase {
  async "test globally sets up a fake DOM"() {
    let globalWindow
    let globalDocument

    class ExampleBrowserTestCase extends BrowserTestCase {
      "test method"() {
        globalWindow = window
        globalDocument = document
      }
    }

    let bus = stub("bus")
    bus.stubs.method("post")
    let test = new ExampleBrowserTestCase(bus)

    await test.run()

    this.assertNotEqual(undefined, globalWindow)
    this.assertNotEqual(undefined, globalDocument)
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

    this.assertEqual(3, paragraphs.length)
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

    this.assertEqual("element", element.id)
  }
}

import { JSDOM } from "jsdom"
import { TestCase } from "./test_case"

export class BrowserTestCase extends TestCase {
  html = "<html></html>"

  setup() {
    this.dom = new JSDOM(this.html)
    global.window = this.dom.window
    global.document = this.dom.window.document
  }

  teardown() {
    this.dom = undefined
    global.window = undefined
    global.document = undefined
  }

  element(selector) {
    return document.querySelector(selector)
  }
}

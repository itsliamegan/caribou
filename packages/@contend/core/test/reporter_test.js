import { TestCase } from "contend"
import { mock, stub } from "contend/doubles"
import { Reporter } from "../lib/reporter"
import { SuiteStarted } from "../lib/events/suite_started"
import { SuiteFinished } from "../lib/events/suite_finished"
import { TestCaseStarted } from "../lib/events/test_case_started"
import { TestCaseFinished } from "../lib/events/test_case_finished"
import { Color } from "../lib/color"

export class ReporterTest extends TestCase {
  "test registers lifecycle events"() {
    let bus = mock("bus")
    let sink = stub("sink")
    let reporter = new Reporter(bus, sink)
    bus.expects("register").with(SuiteStarted, reporter)
    bus.expects("register").with(SuiteFinished, reporter)
    bus.expects("register").with(TestCaseStarted, reporter)
    bus.expects("register").with(TestCaseFinished, reporter)

    reporter.listen()

    bus.verify()
  }

  "test writes a message when the suite starts"() {
    let bus = stub("bus")
    bus.stubs.method("register")
    let sink = mock("sink")
    sink.expects("write").with("Running...\n\n")
    let reporter = new Reporter(bus, sink)
    let suite = stub("suite")
    let event = new SuiteStarted({ suite })

    reporter.listen()
    reporter.received(event)

    sink.verify()
  }

  "test writes a message when a test finishes"() {
    let bus = stub("bus")
    bus.stubs.method("register")
    let sink = mock("sink")
    sink.expects("write").with(" PASS ", { foreground: Color.white, background: Color.green })
    sink.expects("write").with(" PassedTest\n")
    sink.expects("write").with(" FAIL ", { foreground: Color.white, background: Color.red })
    sink.expects("write").with(" FailedTest\n")
    sink.expects("write").with("\n")
    sink.expects("write").with("  test failure\n")
    sink.expects("write").with("  → Expected something\n", { foreground: Color.red })
    sink.expects("write").with("\n")
    let reporter = new Reporter(bus, sink)
    let passed = stub("passed")
    passed.stubs.property("name").value("PassedTest")
    passed.stubs.property("passed").value(true)
    passed.stubs.property("failed").value(false)
    passed.stubs.property("failures").value([])
    let failure = stub("failure")
    failure.stubs.property("name").value("test failure")
    failure.stubs.property("message").value("Expected something")
    let failed = stub("failed")
    failed.stubs.property("name").value("FailedTest")
    failed.stubs.property("passed").value(false)
    failed.stubs.property("failed").value(true)
    failed.stubs.property("failures").value([failure])
    let passed_event = new TestCaseFinished({ test: passed })
    let failed_event = new TestCaseFinished({ test: failed })

    reporter.listen()
    reporter.received(passed_event)
    reporter.received(failed_event)

    sink.verify()
  }

  "test writes details when the suite finishes"() {
    let bus = stub("bus")
    bus.stubs.method("register")
    let sink = mock("sink")
    sink.expects("write").with("\nRan tests in 5.00s\n")
    let reporter = new Reporter(bus, sink)
    let suite = stub("suite")
    suite.stubs.property("time").value(5000)
    let event = new SuiteFinished({ suite })

    reporter.listen()
    reporter.received(event)

    sink.verify()
  }
}

const formatFailureMessage = require('./format-failure')
const jestFailureMessages = require('./jest-failure-messages')
const jestOutcome = require('./jest-outcome')

const passedOutcomes = {
  passed: true,
  skipped: true,
  xfailed: true
}

const toTest = test => ({
  ancestorTitles: [],
  duration: test.duration,
  failureMessages: jestFailureMessages(test),
  fullName: test.nodeid,
  numPassingAsserts: passedOutcomes[test.outcome] ? 1 : 0,
  status: jestOutcome(test.outcome),
  title: test.domain
})
module.exports = ({ testPath, summary, snapshot, tests }) => {
  const end = +new Date()
  const testResults = tests.map(toTest)

  return {
    console: null,
    failureMessage:
      summary.failed || summary.error
        ? formatFailureMessage(testResults)
        : null,
    numFailingTests: (summary.failed || 0) + (summary.error || 0),
    numPassingTests: summary.passed || 0,
    numPendingTests: 0,
    perfStats: {
      end: end,
      start: end - summary.duration
    },
    skipped: false,
    snapshot: {
      added: snapshot.added || 0,
      fileDeleted: false,
      matched: snapshot.successful || 0,
      unchecked: 0,
      unmatched: snapshot.failed || 0,
      updated: 0
    },
    sourceMaps: {},
    testExecError: null,
    testFilePath: testPath,
    testResults
  }
}

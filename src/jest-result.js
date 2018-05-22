const formatFailureMessage = require('./format-failure')
const passedOutcomes = { passed: true, skipped: true, xfailed: true }
const toTest = test => ({
  ancestorTitles: [],
  duration: test.duration,
  failureMessages:
    test.call && test.call.outcome === 'failed' ? [test.call.longrepr] : [],
  fullName: test.nodeid,
  numPassingAsserts: passedOutcomes[test.outcome] ? 1 : 0,
  status: test.outcome,
  title: test.domain
})
module.exports = ({ testPath, summary, snapshot, tests }) => {
  const end = +new Date()
  return {
    console: null,
    failureMessage: summary.failed ? formatFailureMessage(tests) : null,
    numFailingTests: summary.failed || 0,
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
    testResults: tests.map(toTest)
  }
}

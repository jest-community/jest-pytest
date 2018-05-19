const throat = require('throat')
const execa = require('execa')
const jestResult = require('./jest-result')

class TestRunner {
  constructor(globalConfig) {
    this._globalConfig = globalConfig
  }

  async runTests(tests, watcher, onStart, onResult, onFailure, options) {
    const mutex = throat(this._globalConfig.maxWorkers)
    return Promise.all(
      tests.map(test =>
        mutex(async () => {
          if (watcher.isInterrupted()) {
            throw new CancelRun()
          }

          await onStart(test)

          return this._runTest(
            test.path,
            test.context.config,
            test.context.resolver
          )
            .then(result => onResult(test, result))
            .catch(error => onFailure(test, error))
        })
      )
    )
  }

  async _runTest(testPath, projectConfig, resolver) {
    const stderr = await execa('py.test', [
      '-vv',
      '--json-report',
      '--json-report-file=/dev/stderr',
      testPath
    ])
      .then(({ stderr }) => stderr)
      .catch(({ stderr }) => stderr)
    let result = null
    try {
      result = JSON.parse(stderr)
    } catch (error) {
      return Promise.reject(stderr)
    }
    return jestResult({ ...result, testPath })
  }
}

class CancelRun extends Error {
  constructor(message) {
    super(message)
    this.name = 'CancelRun'
  }
}

module.exports = TestRunner

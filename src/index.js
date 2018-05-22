const throat = require('throat')
const execa = require('execa')
const jestResult = require('./jest-result')
const fs = require('fs-extra')
const tempy = require('tempy')

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
    if (this._globalConfig.updateSnapshot === 'all') {
      await execa('py.test', ['-vv', '--snapshot-update']).catch(() => {})
    }
    const outfile = tempy.file({ extension: 'jest-pytest.json' })
    await execa('py.test', [
      '-vv',
      '--jest-report',
      `--jest-report-file=${outfile}`,
      testPath
    ])

    try {
      const result = JSON.parse(await fs.readFile(outfile))
      return jestResult({ ...result, testPath })
    } catch (error) {
      return Promise.reject(error)
    } finally {
      if (process.env['JEST_PYTEST_DEBUG_IPC']) {
        console.log('file:', outfile)
      } else {
        await fs.unlink(outfile)
      }
    }
  }
}

class CancelRun extends Error {
  constructor(message) {
    super(message)
    this.name = 'CancelRun'
  }
}

module.exports = TestRunner

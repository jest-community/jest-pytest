const throat = require('throat')
const execa = require('execa')
const jestResult = require('./jest-result')
const fs = require('fs-extra')
const tempy = require('tempy')

const removeOutput = file => fs.remove(file).catch(() => {})

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
    const config = (projectConfig.testEnvironmentOptions || {})['pytest']
    const plugins = config ? config.plugins : []

    let args = ['-vv']

    if (this._globalConfig.updateSnapshot === 'all') {
      await execa('py.test', args.concat(['--snapshot-update']))
    }
    const outfile = tempy.file({ extension: 'jest-pytest.json' })
    if (process.env['JEST_PYTEST_DEBUG_IPC']) {
      console.log('file:', outfile)
    }

    args = args.concat([
      '-vv',
      '--jest-report',
      `--jest-report-file=${outfile}`
    ])

    plugins.forEach(function (pluginName) {
      args = args.concat(['-p', pluginName])
    })

    const res = await execa('py.test', args.concat([
      testPath
    ])).catch(err => {
      if (process.env['JEST_PYTEST_DEBUG_IPC']) {
        console.log('py.test error:', err)
      }
      return err
    }) // all communication happen through files, we swallow exit(1)'s.

    try {
      const result = JSON.parse(await fs.readFile(outfile))
      await removeOutput(outfile)
      return jestResult({ ...result, testPath })
    } catch (error) {
      return Promise.reject(error + '\n\nPytest output:\n\n' + res)
    } finally {
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

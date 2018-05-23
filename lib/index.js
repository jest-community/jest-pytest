function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const throat = require('throat');

const execa = require('execa');

const jestResult = require('./jest-result');

const fs = require('fs-extra');

const tempy = require('tempy');

const removeOutput = file => fs.remove(file).catch(() => {});

class TestRunner {
  constructor(globalConfig) {
    this._globalConfig = globalConfig;
  }

  runTests(tests, watcher, onStart, onResult, onFailure, options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const mutex = throat(_this._globalConfig.maxWorkers);
      return Promise.all(tests.map(test => mutex(
      /*#__PURE__*/
      _asyncToGenerator(function* () {
        if (watcher.isInterrupted()) {
          throw new CancelRun();
        }

        yield onStart(test);
        return _this._runTest(test.path, test.context.config, test.context.resolver).then(result => onResult(test, result)).catch(error => onFailure(test, error));
      }))));
    })();
  }

  _runTest(testPath, projectConfig, resolver) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (_this2._globalConfig.updateSnapshot === 'all') {
        yield execa('py.test', ['-vv', '--snapshot-update']);
      }

      const outfile = tempy.file({
        extension: 'jest-pytest.json'
      });

      if (process.env['JEST_PYTEST_DEBUG_IPC']) {
        console.log('file:', outfile);
      }

      const res = yield execa('py.test', ['-vv', '--jest-report', `--jest-report-file=${outfile}`, testPath]).catch(err => {
        if (process.env['JEST_PYTEST_DEBUG_IPC']) {
          console.log('py.test error:', err);
        }

        return err;
      }); // all communication happen through files, we swallow exit(1)'s.

      try {
        const result = JSON.parse((yield fs.readFile(outfile)));
        yield removeOutput(outfile);
        return jestResult(_extends({}, result, {
          testPath
        }));
      } catch (error) {
        return Promise.reject(error + '\n\nPytest output:\n\n' + res);
      } finally {}
    })();
  }

}

class CancelRun extends Error {
  constructor(message) {
    super(message);
    this.name = 'CancelRun';
  }

}

module.exports = TestRunner;
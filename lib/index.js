function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const throat = require('throat');

const execa = require('execa');

const jestResult = require('./jest-result');

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
    return _asyncToGenerator(function* () {
      const stderr = yield execa('py.test', ['-vv', '--jest-report', testPath]).then(({
        stderr
      }) => stderr).catch(({
        stderr
      }) => stderr);
      let result = null;

      try {
        result = JSON.parse(stderr);
      } catch (error) {
        return Promise.reject(stderr);
      }

      return jestResult(_extends({}, result, {
        testPath
      }));
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
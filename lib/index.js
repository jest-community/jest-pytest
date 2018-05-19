function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

class Foobar {
  constructor() {
    Object.defineProperty(this, "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        yes: 1
      }
    });
  }

}

const foo =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* () {
    const res = yield Promise.resolve(new Foobar());
    return res;
  });

  return function foo() {
    return _ref.apply(this, arguments);
  };
}();

console.log('hello', {
  foo: foo()
});
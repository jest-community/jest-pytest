module.exports = test => {
  if (test.call && test.call.outcome === 'failed') {
    return [test.call.longrepr];
  }

  if (test.outcome === 'error') {
    if (test.setup && test.setup.outcome === 'failed') {
      return [test.setup.longrepr];
    }

    if (test.teardown && test.teardown.outcome === 'failed') {
      return [test.teardown.longrepr];
    }
  }

  return [];
};
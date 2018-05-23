module.exports = outcome => {
  if (outcome === 'error') {
    return 'failed';
  }

  return outcome;
};
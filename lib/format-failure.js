const chalk = require('chalk');

const TITLE_INDENT = '  ';
const MESSAGE_INDENT = '    ';
const TITLE_BULLET = chalk.bold('\u25cf ');

module.exports = tests => tests.filter(test => test.outcome === 'failed').map(test => {
  const message = test.call.longrepr.split(/\n/).map(line => MESSAGE_INDENT + line).join('\n');
  const title = chalk.bold.red(TITLE_INDENT + TITLE_BULLET + test.domain) + '\n';
  return title + '\n' + message;
}).join('\n') + '\n';
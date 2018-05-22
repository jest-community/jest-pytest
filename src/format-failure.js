const chalk = require('chalk')
const TITLE_INDENT = '  '
const MESSAGE_INDENT = '    '
const TITLE_BULLET = chalk.bold('\u25cf ')

module.exports = tests =>
  tests
    .filter(test => test.status === 'failed')
    .map(test => {
      const firstmsg =
        test.failureMessages.length > 0 ? test.failureMessages[0] : ''
      const message = firstmsg
        .split(/\n/)
        .map(line => MESSAGE_INDENT + line)
        .join('\n')

      const title =
        chalk.bold.red(TITLE_INDENT + TITLE_BULLET + test.title) + '\n'

      return title + '\n' + message
    })
    .join('\n') + '\n'

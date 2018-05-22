/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl
    return baseUrl + (language ? language + '/' : '') + doc
  }

  render() {
    const currentYear = new Date().getFullYear()
    return (
      <footer
        style={{ textAlign: 'center' }}
        className="nav-footer"
        id="footer"
      >
        <a
          href="https://github.com/jondot/jest-pytest"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            src={this.props.config.baseUrl + 'img/jest-snaky.png'}
            alt="Jest-Pytest"
            width="50"
          />
        </a>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    )
  }
}

module.exports = Footer

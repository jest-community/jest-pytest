/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')
const MarkdownBlock = CompLibrary.MarkdownBlock /* Used to read markdown */
const Container = CompLibrary.Container
const GridBlock = CompLibrary.GridBlock

const siteConfig = require(process.cwd() + '/siteConfig.js')

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    )
  }
}

Button.defaultProps = {
  target: '_self'
}

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
)

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
)

const ProjectTitle = props => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
)

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
)

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || ''
    return (
      <SplashContainer>
        <Logo img_src={imgUrl('jest-snaky.svg')} />
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <a
              className="github-button"
              href="https://github.com/jondot/jest-pytest"
              data-icon="octicon-star"
              data-count-href="/jondot/jest-pytest/stargazers"
              data-show-count
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub"
            >
              Star
            </a>
          </PromoSection>
        </div>
      </SplashContainer>
    )
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}
  >
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
)
const Screen = ({ img }) => (
  <div
    style={{
      textAlign: 'center',
      backgroundColor: '#202020',
      padding: '10px 0'
    }}
  >
    <img src={imgUrl(img)} />
  </div>
)

const BigFeature = ({ img, p, h }) => (
  <div style={{ paddingTop: 80 }}>
    <div
      className="productShowcaseSection"
      style={{
        paddingBottom: 20
      }}
    >
      <h2>{h}</h2>
      <p>{p}</p>
    </div>
    <Screen img={img} />
  </div>
)
const FeatureCallout = props => (
  <div
    className="productShowcaseSection"
    style={{ textAlign: 'left', margin: '0 auto', maxWidth: 600 }}
  >
    <h2>Become a Python Testing Powerhouse</h2>
    <br />
    <MarkdownBlock>{`
    $ pip install pytest-jest

We recommend to also use [snapshottest](https://github.com/syrusakbary/snapshottest):

    $ pip install snapshottest

Add a package.json, Jest, and Jest-Pytest:

    $ yarn init && yarn add --dev jest jest-pytest

Add this to your package.json configuration:

    "jest": {
      "moduleFileExtensions": ["py"],
      "runner": "jest-pytest",
      "testPathIgnorePatterns": [],
      "testMatch": ["<rootDir>/tests/test_*.py"]
    },

And run:

    $ yarn jest --watch


Take a look at some configured examples: [Simple](https://github.com/jondot/jest-pytest/tree/master/src/__tests__/integration/simple), [Flask](https://github.com/jondot/jest-pytest/tree/master/src/__tests__/integration/flask), [Requests](https://github.com/jondot/jest-pytest/tree/master/src/__tests__/integration/requests), and [Home Assistant](https://github.com/jondot/jest-pytest/tree/master/src/__tests__/integration/home-assistant).
     `}</MarkdownBlock>
  </div>
)

const TryOut = props => (
  <Container padding={['bottom', 'top']}>
    <a className="anchor" name="watch" />
    <a className="hash-link" href="#watch" />
    <div className="blockElement imageAlignSide twoByGridBlock">
      <div className="video">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/NtjyeojAOBs"
          frameBorder="0"
          allowFullScreen
        />
      </div>
      <div className="blockContent">
        <h2>Learn about Jest</h2>
        <div>
          <MarkdownBlock>
            The Jest core team and contributors regularly speak about Jest and
            [Jest as a Platform](https://www.youtube.com/watch?v=NtjyeojAOBs),
            and now you can use it with Python too :).
          </MarkdownBlock>
          <br />

          <Button href="https://facebook.github.io/jest/en/videos.html">
            Watch more Jest Videos
          </Button>
        </div>
      </div>
    </div>
  </Container>
)

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img
            style={{ borderRadius: 75, paddingBottom: 10 }}
            src={user.image}
            alt={user.caption}
            title={user.caption}
          />
          <div>{user.handle}</div>
        </a>
      )
    })

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>{"Who's Behind This?"}</h2>
      <p>This project was built by the Jest community</p>
      <div className="logos" style={{ marginBottom: 20 }}>
        {showcase}
      </div>
      <div className="more-users">
        <a
          className="button"
          href="https://github.com/jest-community/jest-pytest"
        >
          Check Out the Github Repo &rarr;
        </a>
      </div>
    </div>
  )
}

class Index extends React.Component {
  render() {
    let language = this.props.language || ''

    return (
      <div>
        <HomeSplash language={language} />
        <Screen img="jest-success.png" />
        <div className="mainContainer">
          <FeatureCallout />
          <BigFeature
            h="Save time. Get In Your Zone."
            p="Use the best of breed test platform - now for Python too. A developer experience you're going to fall in love with."
            img="jest-failed.png"
          />
          <BigFeature
            h="Effortless Snapshots"
            p="Unlock the Jest snapshot experience. Jest-pytest seamlessly integrates with the Pytest snapshots plugin."
            img="jest-snap.png"
          />
          <TryOut />
          <Showcase language={language} />
        </div>
      </div>
    )
  }
}

module.exports = Index

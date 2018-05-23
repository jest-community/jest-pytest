/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'Dotan Nahum',
    image: 'https://avatars1.githubusercontent.com/u/83390?s=460&v=4',
    infoLink: 'https://github.com/jondot',
    handle: '@jondot',
    pinned: true
  },
  {
    caption: 'Christoph Nakazawa',
    image: 'https://avatars3.githubusercontent.com/u/13352?s=400&v=4',
    infoLink: 'https://github.com/cpojer',
    handle: '@cpojer',
    pinned: true
  }
]

const siteConfig = {
  title: 'Jest-Pytest' /* title for your website */,
  tagline: 'A Jest and Pytest integration made in heaven 💖',
  url: 'https://jest-community.github.io' /* your website url */,
  gaTrackingId: 'UA-7131053-24',
  baseUrl: '/jest-pytest/' /* base url for your project */,
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'jest-pytest',
  organizationName: 'jest-community',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'overview', label: 'Docs' },
    { href: 'http://github.com/jondot/jest-pytest/issues', label: 'Help' }
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/jest-snaky.svg',
  footerIcon: 'img/jest-snaky.svg',
  favicon: 'img/favicon.png',

  /* colors for website */
  colors: {
    primaryColor: '#43a746',
    secondaryColor: '#205C3B'
  },

  /* custom fonts for website */
  /* fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright: 'Copyright © ' + new Date().getFullYear() + ' Dotan Nahum',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default'
  },

  // Add custom scripts here that would be placed in <script> tags
  scripts: ['https://buttons.github.io/buttons.js'],

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  /* Open Graph and Twitter card images */
  ogImage: 'img/jest-snaky.png',
  twitterImage: 'img/jest-snaky.png'

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
}

module.exports = siteConfig

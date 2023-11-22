// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: 'Shardeum Docs',
  tagline: 'Explore Shardeum Docs',
  url: 'https://docs.shardeum.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Shardeum', // Usually your GitHub org/user name.
  projectName: 'shardeum-docs', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/Shardeum/shardeum-docs/tree/master/',
        },
        blog:false,
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
        gtag: {
          trackingID: process.env.GTM_ID || 'GTM-XXXXXXX',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        /* announcementBar: {
           id: 'newsletter',
           content:
             '<p class="text-newsletter">Sign up for Shardeum Developer newsletter <a target="_blank" rel="noopener noreferrer" href="https://shardeum.org/developer-newsletter" class="btn-newsletter">Register for free</a></p>',
           backgroundColor: '#00FF00',
           textColor: '#000000',
           isCloseable: true,
         },*/
        algolia: {
          appId: "CK38X87BB3",
          apiKey: "6d53d06cfe9c8cb794826061687d47b5",
          indexName: "shardeum"
        },
        imageZoom: {
          // CSS selector to apply the plugin to, defaults to '.markdown img'
          // selector: '.markdown img',
          // Optional medium-zoom options
          // see: https://www.npmjs.com/package/medium-zoom#options
          options: {
            margin: 40,
            background: '#000',
            scrollOffset: 60,
            // container: 'main',
            // template: '#zoom-template',
          },
        },
        metadata: [
          {name:'title',content:'Sharding | Shardeum Docs'},
          {name: 'keywords', content: 'harding, blockchain, performance, shard, transactions, shards, transaction, nodes, data, security, storage, consensus, node, process, processing, applications, network, ethereum, cross, ledger, based, distributed, scalability, chain, throughput, called, responsible, malicious, communication, smart'},

        ],
        navbar: {
          title: '',
          hideOnScroll: true,
          logo: {
            alt: 'Shardeum Docs Logo',
            src:     '/img/shardeum_documentation_dark.png',
            srcDark: '/img/shardeum_documentation_light.png',
          },

          items: [
            {
              href: '/network/endpoints#connect-wallet',
              label: 'Connect to Shardeum',
              position: 'left',
              // className: 'navbar_item_button',
            },
            {
              href: '/faucet/claim#shardeum-discord-website',
              label: 'Claim Testnet SHM',
              position: 'left',
              // className: 'navbar_item_button',
            },
            {
              href: 'https://airtable.com/shrIXaaf87BzaTfYy',
              label: 'List dApp on Ecosystem Page',
              position: 'left',
              // className: 'navbar_item_1',
            },
            {
              href: 'https://github.com/Shardeum/shardeum-bug-reporting',
              label: 'Report Bugs Here',
              position: 'left',
              // className: 'navbar_item_2',
            },
            {
              href: 'https://github.com/shardeum/shardeum-docs',
              label: 'GitHub',
              position: 'right',
            },
          ],
        },

        footer: {
          links: [
            {
              title: 'General',
              items: [
                {
                  label: 'Home',
                  to: 'https://shardeum.org',
                },
                {
                  label: 'Mainnet Roadmap',
                  to: 'https://shardeum.org/roadmap/mainnet/',
                },
                {
                  href: '/faucet/claim',
                  label: 'Claim Testnet SHM',
                  position: 'left',

                },
                {
                  label: 'Super Shardians',
                  to: 'https://shm.gg/super-shardian-tasks',
                },
                {
                  label: 'Blog',
                  to: 'https://shardeum.org/blog',
                },

              ],
            },
            {
              title: 'Community',
              items: [
                {
                  label: 'Telegram',
                  to: 'http://t.me/shardians',
                },
                {
                  label: 'Discord',
                  to: 'http://discord.gg/shardeum',
                },
                {
                  label: 'Twitter',
                  to: 'https://twitter.com/shardeum',
                },
              ],
            },
            {
              title: 'Resources',
              items: [
                {
                  label: 'Whitepaper',
                  to: 'https://shm.gg/whitepaper',
                },
                {
                  label: 'FAQs',
                  to: 'https://shardeum.org/explore/faqs/general/',
                },
                {
                  label: 'Brand Assets',
                  to: 'https://drive.google.com/drive/folders/1jdjJNMajHG_QDu_uAXTRrqpXW3AUuiJu',
                },
                {
                  label: 'Public Drive',
                  to: 'https://drive.google.com/drive/folders/1zal5vN3f67Ql-Q8jiSYsp6Nf0xoJuqNI',
                },
              ],
            },
            {
              title: 'Contact',
              items: [
                {
                  label: 'General Inquiries',
                  to: 'mailto:hi@shardeum.org',
                },
                {
                  label: 'Partnership Enquiries',
                  to: 'https://shm.gg/partnership-form',
                },
                {
                  label: 'GitHub',
                  to: 'https://github.com/shardeum',
                },
                {
                  label: 'GitLab',
                  to: 'https://gitlab.com/shardeum',
                },
              ],
            },
          ],
          logo: {
            alt: 'Shardeum Logo',
            src: 'img/shardeum_logo_light_square.png',
            href: 'https://github.com/shardeum',
            height: 100,
            width: 100
          },
          copyright: `Copyright © Shardeum ${new Date().getFullYear()}`,
        },
        prism: {
          theme: darkCodeTheme,
          additionalLanguages: ["solidity","python","rust"],
        },
        colorMode: {
          defaultMode: 'dark',
          disableSwitch: false,
          respectPrefersColorScheme: true
        },

      }),
  // plugins: ['docusaurus-plugin-sass',
  //           'plugin-image-zoom',
  //           'docusaurus-lunr-search'],
  plugins: ['docusaurus-plugin-sass',
    'plugin-image-zoom'],
};

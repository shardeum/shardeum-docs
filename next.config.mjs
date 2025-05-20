import createMDX from 'fumadocs-mdx/config';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/',
  //     },
  //     {
  //       source: '/whitepaper',
  //       destination: '/whitepaper',
  //     },
  //     {
  //       source: '/:path*',
  //       destination: '/docs/:path*',
  //     },
  //   ];
  // },
  
  async redirects() {
    return [
      // Run a Node redirects - specific paths
      {
        source: '/docs/node/run-a-node/validator/getting-started',
        destination: '/docs/run-a-node/getting-started',
        permanent: true,
      },
      {
        source: '/docs/node/run/validator/getting-started',
        destination: '/docs/run-a-node/getting-started',
        permanent: true,
      },
      {
        source: '/docs/node/run-a-node/validator/setup/self-host',
        destination: '/docs/run-a-node/self-host',
        permanent: true,
      },
      {
        source: '/docs/node/run/validator/setup/self-host',
        destination: '/docs/run-a-node/self-host',
        permanent: true,
      },
      {
        source: '/docs/node/run-a-node/validator/setup/one-click-install',
        destination: '/docs/run-a-node/one-click-install',
        permanent: true,
      },
      {
        source: '/docs/node/run/validator/setup/one-click-install',
        destination: '/docs/run-a-node/one-click-install',
        permanent: true,
      },
      {
        source: '/docs/node/run-a-node/validator/setup/cloud-service-providers',
        destination: '/docs/run-a-node/cloud-service-providers',
        permanent: true,
      },
      {
        source: '/docs/node/run/validator/setup/cloud-service-providers',
        destination: '/docs/run-a-node/cloud-service-providers',
        permanent: true,
      },
      // Catch-all for other node paths
      {
        source: '/docs/node/:path*',
        destination: '/docs/run-a-node/:path*',
        permanent: true,
      },
      
      // Developer section redirects - most important specific paths
      {
        source: '/docs/architecture/high-level-architecture',
        destination: '/docs/developer/architecture/high-level-architecture',
        permanent: true,
      },
      // Wildcard for all other architecture pages
      {
        source: '/docs/architecture/:path*',
        destination: '/docs/developer/architecture/:path*',
        permanent: true,
      },
      {
        source: '/docs/api/json-rpc',
        destination: '/docs/developer/json-rpc',
        permanent: true,
      },
      {
        source: '/docs/json-rpc',
        destination: '/docs/developer/json-rpc',
        permanent: true,
      },
      {
        source: '/docs/faucet/claim',
        destination: '/docs/developer/faucet',
        permanent: true,
      },
      {
        source: '/docs/faucet',
        destination: '/docs/developer/faucet',
        permanent: true,
      },
      // Wildcard for all smart contracts pages
      {
        source: '/docs/smart-contracts/:path*',
        destination: '/docs/developer/smart-contracts/:path*',
        permanent: true,
      },
      
      // Network section redirects
      {
        source: '/docs/network/endpoints',
        destination: '/docs/endpoints',
        permanent: true,
      },
      {
        source: '/docs/network/explorer',
        destination: '/docs/endpoints',
        permanent: true,
      },
      {
        source: '/docs/network/network-and-rpc',
        destination: '/docs/developer/network-and-rpc',
        permanent: true,
      },
      
      // Ecosystem section redirects
      {
        source: '/docs/node/run/json-rpc',
        destination: '/docs/developer/json-rpc',
        permanent: true,
      },
      {
        source: '/docs/node/run/localdata-rpc',
        destination: '/docs/developer/localdata-rpc',
        permanent: true,
      },
      {
        source: '/docs/node/types',
        destination: '/docs/ecosystem/node-types',
        permanent: true,
      },
      {
        source: '/docs/transaction-types/transaction-types',
        destination: '/docs/ecosystem/transaction-types',
        permanent: true,
      },
      // Catch-all for other node paths
      {
        source: '/docs/node/:path*',
        destination: '/docs/run-a-node/:path*',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);

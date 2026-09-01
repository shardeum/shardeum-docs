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
      // ---- Legacy /docs/node/** -> /docs/run-a-node/** ----
      // Specific legacy paths MUST come before the /docs/node/:path* catch-all,
      // otherwise the catch-all shadows them and produces broken URLs.
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
      {
        source: '/docs/node/run/validator',
        destination: '/docs/run-a-node/run-a-validator-node',
        permanent: true,
      },
      {
        source: '/docs/node/run/json-rpc',
        destination: '/docs/developer/json-rpc',
        permanent: true,
      },
      {
        source: '/docs/node/run/localdata-rpc',
        destination: '/docs/ecosystem/localdata-rpc',
        permanent: true,
      },
      {
        source: '/docs/node/types',
        destination: '/docs/run-a-node/node-types',
        permanent: true,
      },
      // Catch-all for any other legacy node paths
      {
        source: '/docs/node/:path*',
        destination: '/docs/run-a-node/:path*',
        permanent: true,
      },

      // ---- Legacy run-a-node/validator/** sub-tree -> flattened run-a-node pages ----
      {
        source: '/docs/run-a-node/validator/getting-started',
        destination: '/docs/run-a-node/getting-started',
        permanent: true,
      },
      {
        source: '/docs/run-a-node/validator/setup/self-host',
        destination: '/docs/run-a-node/self-host',
        permanent: true,
      },
      {
        source: '/docs/run-a-node/validator/setup/one-click-install',
        destination: '/docs/run-a-node/one-click-install',
        permanent: true,
      },
      {
        source: '/docs/run-a-node/validator/setup/cloud-service-providers/:path*',
        destination: '/docs/run-a-node/cloud-service-providers/:path*',
        permanent: true,
      },

      // ---- Legacy /docs/architecture/** -> /docs/developer/architecture/** ----
      {
        source: '/docs/architecture/high-level-architecture',
        destination: '/docs/developer/architecture/high-level-architecture',
        permanent: true,
      },
      {
        source: '/docs/architecture/:path*',
        destination: '/docs/developer/architecture/:path*',
        permanent: true,
      },
      {
        source: '/docs/transaction-types/transaction-types',
        destination: '/docs/developer/architecture/transaction-types',
        permanent: true,
      },

      // ---- JSON-RPC / faucet ----
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
        destination: '/docs/developer/testnet-quickstart',
        permanent: true,
      },
      {
        source: '/docs/faucet',
        destination: '/docs/developer/testnet-quickstart',
        permanent: true,
      },
      {
        source: '/docs/developer/faucet',
        destination: '/docs/developer/testnet-quickstart',
        permanent: true,
      },

      // ---- Smart contracts ----
      {
        source: '/docs/smart-contracts/:path*',
        destination: '/docs/developer/smart-contracts/:path*',
        permanent: true,
      },

      // ---- Network section ----
      {
        source: '/docs/network/endpoints',
        destination: '/docs/overview/endpoints',
        permanent: true,
      },
      {
        source: '/docs/network/explorer',
        destination: '/docs/overview/endpoints',
        permanent: true,
      },
      {
        source: '/docs/network/network-and-rpc',
        destination: '/docs/developer/network-interfaces',
        permanent: true,
      },
      {
        source: '/docs/developer/network-and-rpc',
        destination: '/docs/developer/network-interfaces',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);

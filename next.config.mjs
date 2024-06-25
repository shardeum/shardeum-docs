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
};

export default withMDX(config);

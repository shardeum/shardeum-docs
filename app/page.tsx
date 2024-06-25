"use client";
import { ArrowUpRightIcon, CubeTransparentIcon, CurrencyDollarIcon, ViewfinderCircleIcon, RocketLaunchIcon, NewspaperIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Shardeum Overview',
    description: 'Dive deep into the innovative features and architecture of Shardeum.',
    icon: ViewfinderCircleIcon,
    link: '/docs'
  },
  {
    name: 'Run a Validator Node',
    description: 'Contribute to the security and decentralization of the Shardeum network by running a validator node.',
    icon: RocketLaunchIcon,
    link: '/docs/node/run/validator'
  },
  {
    name: 'Network Setup',
    description: 'Easily add the Shardeum network to your wallet with just a few clicks.',
    icon: CubeTransparentIcon,
    link: '/docs/network/endpoints'
  },
  {
    name: 'Faucet',
    description: 'Access testnet SHM tokens with our simple faucet service.',
    icon: CurrencyDollarIcon,
    link: '/docs/faucet/claim'
  },
  {
    name: 'Deploy Smart Contracts',
    description: 'Leverage Shardeum to deploy scalable and efficient smart contracts.',
    icon: ArrowUpRightIcon,
    link: '/docs/smart-contracts/deploy/foundry'
  },
  {
    name: 'Shardeum Whitepaper',
    description: 'Dive into Shardeum Whitepaper to learn more about the Project.',
    icon: NewspaperIcon,
    link: '/docs/whitepaper'
  },
];

export default function Home() {
  return (
      <div className="py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Shardeum Documentation
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
              Shardeum is a scalable, secure, and efficient blockchain platform that enables developers to build and deploy decentralized applications. Dive into our documentation to learn more about Shardeum and how to get started with the network.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-7xl">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
              {features.map((feature) => (
                <a key={feature.name} href={feature.link} className="relative border border-gray-300 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center text-center transition-transform duration-300 hover:shadow-lg hover:scale-105 hover:border-indigo-500 dark:hover:border-indigo-500">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 mb-4">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <dt className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{feature.description}</dd>
                </a>
              ))}
            </dl>
          </div>
        </div>
      </div>
  );
}

import Footer from '@/components/Footer/page';
import { ArrowUpRightIcon, CubeTransparentIcon, CurrencyDollarIcon, ViewfinderCircleIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Shardeum Overview',
    description: 'Dive deep into the innovative features and architecture of Shardeum. ',
    icon: ViewfinderCircleIcon,
    link: '/docs'
  },

  {
    name: 'Run a Validator Node',
    description: 'Contribute to the security and decentralization of the Shardeum network by running a validator node. ',
    icon: RocketLaunchIcon,
    link: '/docs/node/run/validator'
  },
  {
    name: 'Network Setup',
    description: 'Easily add the Shardeum Sphinx 1.X network to your setup with just a few clicks. ',
    icon: CubeTransparentIcon,
    link: '/docs/network'
  },
  {
    name: 'Faucet',
    description: 'Access testnet SHM tokens for Shardeum Sphinx 1.X with our simple faucet service. ',
    icon: CurrencyDollarIcon,
    link: '/docs/faucet'
  },
  {
    name: 'Deploy Smart Contracts',
    description: 'Leverage Shardeum to deploy scalable and efficient smart contracts. ',
    icon: ArrowUpRightIcon,
    link: '/docs/smart-contracts/deploy/foundry'
  },

];

export default function Home() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shardeum Documentation
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Shardeum is a scalable, secure, and efficient blockchain platform that enables developers to build and deploy decentralized applications. Dive into our documentation to learn more about Shardeum and how to get started with the platform.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <a key={feature.name} href={feature.link} className="relative border border-gray-300 rounded-lg p-6 flex flex-col items-center text-center transition-transform duration-300 hover:shadow-lg hover:scale-105">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#3042FB] mb-4">
                  <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <dt className="text-base font-semibold leading-7">
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </a>
            ))}
          </dl>
        </div>
      </div>
      <Footer />
    </div>
  )
}



import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Connect to Shardeum', href: '/docs/overview/endpoints' },
  { name: 'Delegate Now', href: 'https://dashboard.shardeum.org/validators' },
  { name: 'Github', href: 'https://github.com/shardeum' },
  { name: 'Partnership Enquiries', href: 'https://shm.gg/partner-form' },
  { name: 'Testnet Quickstart', href: '/docs/developer/testnet-quickstart' },
];

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export default function Header({ isDarkMode, setIsDarkMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-black sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8" aria-label="Global">
        <div className="flex">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Shardeum</span>
            <img
              alt="Shardeum Logo"
              src={isDarkMode ? "/shardeum_documentation_light.png" : "/shardeum_documentation_dark.png"}
              width="175"
              height="35"
              style={{ maxWidth: '100%' }}
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:gap-x-12">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="text-md font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-indigo-600 transition duration-200">
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex">
          <button
            type="button"
            className="p-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 rounded-md"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? (
              <SunIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <MoonIcon className="h-6 w-6" aria-hidden="true" />
            )}
            <span className="sr-only">{isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}</span>
          </button>
        </div>
      </nav>
      <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10 bg-black bg-opacity-25" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Shardeum</span>
              <img
                alt="Shardeum Logo"
                src={isDarkMode ? "/shardeum_documentation_light.png" : "/shardeum_documentation_dark.png"}
                width="175"
                height="35"
                style={{ maxWidth: '100%' }}
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navItems.map((item) => (
                  <a key={item.name} href={item.href} className="block rounded-lg py-2 pl-3 pr-3 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200">
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

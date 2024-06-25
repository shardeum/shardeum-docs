import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, PlayCircleIcon, DocumentIcon, CodeBracketIcon, ChatBubbleBottomCenterIcon, AcademicCapIcon, VideoCameraIcon, GlobeAltIcon } from '@heroicons/react/20/solid';

const resources = [
  { name: 'Shardeum University', description: 'Learn about Shardeum and blockchain technology', href: 'https://university.shardeum.org', icon: AcademicCapIcon },
  { name: 'Github', description: 'Explore and contribute to our open source projects', href: 'https://github.com/shardeum', icon: CodeBracketIcon },
  { name: 'Discord', description: 'Join our community and engage in discussions', href: 'https://discord.com/invite/shardeum', icon: ChatBubbleBottomCenterIcon },
  { name: 'YouTube', description: 'Watch tutorials and talks on our YouTube channel', href: 'https://www.youtube.com/channel/UCShardeum', icon: VideoCameraIcon },
  { name: 'Oss Webpage', description: 'Visit our open source webpage for more information', href: 'https://oss.shardeum.org', icon: GlobeAltIcon },
];
const callsToAction = [
  { name: 'Watch Shardeum', href: 'https://youtube.com/playlist?list=PLh0cCRPj3dydrsw2sIBfuodyrvc_PZloY&si=ivoyWlKYkHs0mkRe', icon: PlayCircleIcon },
  { name: 'Contact Us', href: 'mailto:hi@shardeum.org', icon: DocumentIcon },
];

const navItems = [
  { name: 'Connect to Shardeum', href: '/docs/network/endpoints' },
  { name: 'Report Bugs', href: 'https://github.com/shardeum/bug-reporting' },
  { name: 'Github', href: 'https://github.com/shardeum' },
  { name: 'Claim Testnet SHM', href: '/docs/faucet/claim' },
  { name: 'Join Shardeum Discord', href: 'https://discord.com/invite/shardeum' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export default function Header({ isDarkMode, setIsDarkMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popoverRef]);

  return (
    <header className="bg-white dark:bg-black sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex items-center flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Shardeum</span>
            <picture>
              <source media="(prefers-color-scheme: dark)" srcSet="/shardeum_documentation_dark.png" />
              <source media="(prefers-color-scheme: light)" srcSet="/shardeum_documentation_light.png" />
              <img alt="Shardeum Logo" src={isDarkMode ? "/shardeum_documentation_dark.png" : "/shardeum_documentation_light.png"} width="175" height="35" style={{ maxWidth: '100%' }} />
            </picture>
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
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative" ref={popoverRef}>
            <PopoverButton
              className="flex items-center gap-x-1 text-md font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-indigo-600 transition duration-200"
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            >
              Resources
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400 group-hover:text-indigo-600 transition duration-200" aria-hidden="true" />
            </PopoverButton>

            <Transition
              show={isPopoverOpen}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white dark:bg-black shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {resources.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-700 group-hover:bg-white dark:group-hover:bg-black transition duration-200">
                        <item.icon className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 transition duration-200" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <a href={item.href} className="block font-semibold text-gray-900 dark:text-gray-300 group-hover:text-indigo-600 transition duration-200">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 dark:bg-gray-700">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                    >
                      <item.icon className="h-5 w-5 flex-none text-gray-400 dark:text-gray-300 group-hover:text-indigo-600 transition duration-200" aria-hidden="true" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>

          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="text-md font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-indigo-600 transition duration-200">
              {item.name}
            </a>
          ))}
        </PopoverGroup>
        <div className="flex items-center lg:ml-6">
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
              <picture>
                <source media="(prefers-color-scheme: dark)" srcSet="/shardeum_documentation_dark.png" />
                <source media="(prefers-color-scheme: light)" srcSet="/shardeum_documentation_light.png" />
                <img alt="Shardeum Logo" src={isDarkMode ? "/shardeum_documentation_dark.png" : "/shardeum_documentation_light.png"} width="175" height="35" style={{ maxWidth: '100%' }} />
              </picture>
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
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200">
                        Resources
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {[...resources, ...callsToAction].map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

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

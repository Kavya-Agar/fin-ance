import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import logo from '../assets/IMG_0087 Background Removed.png'
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Learn', href: '/learn', current: true },
  { name: 'Features', href: '/features', current: false },
  { name: 'About', href: '/about', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <Disclosure as="nav" className="fixed top-0 left-0 w-full z-50 bg-[#4fc2f0] dark:bg-gray-900 transition">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="logo" className="h-10 w-auto" />
            <Link to="/" className="ml-2 text-sm font-light font-pixel text-white tracking-wide hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded transition"
            >
              FIN-ance
            </Link>
          </div>
          {/* Desktop Nav */}
                  <div className="hidden sm:flex space-x-6 font-pixel">
                      {navigation.map((item) => (
                          <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                  item.current
                                      ? 'bg-white/20 text-white'
                                      : 'text-white/80 hover:bg-white/10',
                                  'rounded-full px-4 py-2 font-medium transition'
                              )}
                          >
                              {item.name}
                          </a>
                      ))}
                  </div>
          {/* Actions */}
          <div className="flex items-center">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-slate-700 hover:bg-white/40 transition mr-2"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <MoonIcon className="h-5 w-5 text-yellow-300" /> : <SunIcon className="h-5 w-5 text-yellow-400" />}
            </button>
            {/* Sign Up button */}
            <a
              href="/signup"
              className="ml-2 px-4 py-2 rounded-full bg-white text-[#0faaf0] font-thin shadow font-pixel hover:bg-blue-50 transition"
            >
              Sign Up
            </a>
            {/* Mobile menu button */}
            <div className="sm:hidden ml-2">
              <DisclosureButton className="p-2 rounded-full text-white hover:bg-white/10">
                <Bars3Icon className="h-6 w-6" />
              </DisclosureButton>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Nav */}
      <DisclosurePanel className="sm:hidden bg-[#0faaf0] dark:bg-gray-900">
            <div className="px-2 pt-2 pb-3 space-y-1 font-pixel">
                {navigation.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                    item.current
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:bg-white/10',
                    'block rounded-full px-3 py-2 font-medium transition'
                    )}
                >
                    {item.name}
                </a>
                ))}
                <a
                href="/signup"
                className="block mt-2 px-4 py-2 rounded-full bg-white text-[#0faaf0] font-bold shadow font-pixel hover:bg-blue-50 transition"
                >
                Sign Up
                </a>
            </div>
        </DisclosurePanel>

    </Disclosure>
  );
}

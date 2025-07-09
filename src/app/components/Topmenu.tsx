'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaSearch, FaShoppingBasket, FaHome, FaStore, FaInfoCircle, FaEnvelope  } from 'react-icons/fa';
import Image from 'next/image';

type NavLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const navLinks: NavLink[] = [
  { name: 'Home', href: '/' , icon: <FaHome size={20} /> },
  { name: 'Shop', href: '/shop', icon: <FaStore size={20} /> },
  { name: 'About', href: '/about', icon: <FaInfoCircle size={20} /> },
  { name: 'Contact', href: '/contact', icon: <FaEnvelope size={20} /> },
];

const Topmenu: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/img/logo.png"
            alt="Merchify Logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="hidden md:inline font-extrabold text-xl tracking-tight text-gray-900">
            Merchify
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-gray-800 hover:text-blue-600 transition font-medium ${
                pathname === link.href ? 'underline underline-offset-4' : ''
              }`}
            >
              <span className="text-base md:hidden flex items-center gap-10">
                {link.icon}</span>
              <span className="hidden md:inline">
                {link.name}
              </span>

            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link
            href="/search"
            className="text-gray-700 hover:text-blue-600 transition"
            aria-label="Search"
          >
            <FaSearch size={20} />
          </Link>
          <Link
            href="/cart"
            className="text-gray-700 hover:text-blue-600 transition"
            aria-label="Shopping Cart"
          >
            <FaShoppingBasket size={22} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Topmenu;

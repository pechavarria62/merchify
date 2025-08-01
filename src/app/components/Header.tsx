import React from "react";
import Link from 'next/link';
import Avatar from "./Avatar";
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

const Header: React.FC = () => {

  const pathname = usePathname();

  return (
   <header className="flex items-center justify-between py-0 px-4 border-b">
  <div className="flex items-center gap-2">
  <Image 
    src="/img/logo.png" // replace with your actual logo path
    alt="Company Logo"
    width={32}
    height={32}
    className="object-contain"
  />
  <span className="text-lg font-bold hidden sm:inline">MERCHIFY</span>
</div>
  <nav className="flex items-center gap-4"> {/* changed gap-6 to gap-4 */}
    {navLinks.map((link) => (
      <Link
        key={link.name}
        href={link.href}
        className={`text-gray-800 hover:text-blue-600 transition font-medium ${
          pathname === link.href ? 'underline underline-offset-4' : ''
        }`}
      >
        <span className="text-base md:hidden flex items-center gap-2"> {/* reduced gap */}
          {link.icon}
        </span>
        <span className="hidden md:inline">
          {link.name}
        </span>
      </Link>
    ))}
  </nav>
  <div className="text-xl ml-2"> {/* optional: added margin to slightly space Avatar from nav */}
    <Avatar />
  </div>
</header>

  );
};

export default Header;

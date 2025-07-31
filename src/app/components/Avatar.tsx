'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Avatar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <Image
          src="/img/avatar.jpg"
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full border border-gray-300"
        />
        <span className="hidden md:inline text-gray-800 text-sm">Username</span>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-12 right-0 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-2"
        >
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <Link href="/profile" className="block hover:bg-gray-100 p-2 rounded-md">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/settings" className="block hover:bg-gray-100 p-2 rounded-md">
                Settings
              </Link>
            </li>
            <li>
              <Link href="/saved" className="block hover:bg-gray-100 p-2 rounded-md">
                Saved Shopping List
              </Link>
            </li>
            <li>
              <Link href="/switch-account" className="block hover:bg-gray-100 p-2 rounded-md">
                Switch Account
              </Link>
            </li>
            <li>
              <Link href="/logout" className="block hover:bg-red-100 text-red-600 p-2 rounded-md">
                Logout
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Avatar;

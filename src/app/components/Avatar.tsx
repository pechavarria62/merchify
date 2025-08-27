'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';

const Avatar: React.FC = () => {
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex gap-3">
        <Link
        // bg-blue-600
          href="/login"
          className="px-4 py-2 text-sm rounded-lg bg-orange-500 text-white hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="px-4 py-2 text-sm rounded-lg border border-orange-600 text-orange-600 hover:bg-blue-50"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center gap-2 cursor-pointer">
        <Image
          src={user.avatar} 
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full border border-gray-300"
        />
        <span className="hidden md:inline text-gray-800 text-sm">
          {user.name}
        </span>
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
              <Link
                href="/profile"
                className="block hover:bg-gray-100 p-2 rounded-md"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="block hover:bg-gray-100 p-2 rounded-md"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                href="/saved"
                className="block hover:bg-gray-100 p-2 rounded-md"
              >
                Saved Shopping List
              </Link>
            </li>
            <li>
              <Link
                href="/switch-account"
                className="block hover:bg-gray-100 p-2 rounded-md"
              >
                Switch Account
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="w-full text-left hover:bg-red-100 text-red-600 p-2 rounded-md"
              >
                Logout
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Avatar;

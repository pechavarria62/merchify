'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {User} from '@/lib/definitions'

const SignupPage: React.FC = () => {
  // Pick only specified field from the interface.
  const [userData, setUserData] = useState<Pick<User, 'email'| 'username'| 'password'>>({
    email: '',
    username: '',
    password: '',
  })
  const [error, setError] = useState('');
  const router = useRouter();
  
  const handleAllImputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUserData(PrevData => ({
      ...PrevData,
      [name]:value,
    }));
  }
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const {email, username, password} = userData;
    if (!email || !username || !password) {
      setError('All fields are required');
      return;
    }
    
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      console.log(res, 'Show the data')
      if (!res.ok) {
        const data = await res
          .json()
          .catch(() => ({
            message: 'something went wrong',
          }));
        setError(data.message);
        return;
      }
      router.push('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error('Signup error:', err);
        return;
      } else {
        setError('something went wrong1');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold text-center mb-8">
          Signup Page
        </h1>
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              name="email"
              required
              value={userData.email?? ''}
              onChange={handleAllImputChanges}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Choose a username"
              id="username"
              name="username"
              required
              value={userData.username?? ''}
              onChange={handleAllImputChanges}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              id="password"
              name="password"
              required
              value={userData.password?? ''}
              onChange={handleAllImputChanges}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignupPage;

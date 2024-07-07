'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="p-12 max-w-screen-xl mx-auto items-center">
      <div className="grid md:grid-cols-3 sm:grid-cols-1">
        <div className="p-12 sm:p-16 bg-secondary border border-secondary shadow-sm w-full">
          <h3 className="text-2xl font-bold ">Welcome to Register</h3>
          <p className="my-2">
            Register your account and access for the features
          </p>
          <div className="my-4">
            <label htmlFor="refferalCode" className="block text-sm font-medium">
              Referral Code (Optional)
            </label>
            <input
              type="text"
              id="refferalCode"
              className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
            />
            <label
              htmlFor="refferalCode"
              className="mt-2 block text-xs font-medium"
            >
              If you have a referral code, please enter it here to get a
              discount coupon.
            </label>
          </div>
        </div>
        <div className="col-span-2 bg-primary shadow-md w-full">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                required
                className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                required
                className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                required
                className="mt-1 block w-full px-2 py-2 pr-10 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="1">Customer</option>
                <option value="2">Event Organizer</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
              />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="flex justify-between">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
                />
                <span
                  className="absolute right-3 mt-1 top-1/2 cursor-pointer transform"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-3 bg-secondary rounded-md hover:font-bold"
            >
              Register
            </button>
            <hr className="my-4" />
            <Link
              href="/login"
              className="block w-full text-center py-2 px-3 bg-primary border border-secondary rounded-md hover:bg-secondary hover:font-bold"
            >
              Have an account? Login here
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}

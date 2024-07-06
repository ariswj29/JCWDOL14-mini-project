'use client';

import { useState } from 'react';

export default function RegisterPage() {
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
        </div>
        <div className="col-span-2 bg-primary shadow-md w-full">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name
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
                Last Name
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
                Role
              </label>
              <select
                id="role"
                required
                className="mt-1 block w-full px-2 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
              >
                <option value="1">Customer</option>
                <option value="2">Event Organizer</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-3 bg-secondary rounded-md hover:font-bold"
            >
              Register
            </button>
            <hr className="my-4" />
            <button
              type="button"
              className="w-full py-2 px-3 bg-primary border border-secondary rounded-md hover:bg-secondary hover:font-bold"
            >
              Have an account. Login here
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

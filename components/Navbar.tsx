'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold hover:text-gray-300 transition">
          Task Manager
        </Link>

        {/* Navigation Links - Center */}
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-gray-300 transition">
            Dashboard
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex space-x-4">
          <Link
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-between items-center">
        <Link href="/" className="text-lg font-bold hover:text-gray-300 transition">
          Task Manager
        </Link>

        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="focus:outline-none"
          aria-label="Toggle Menu"
        >
          {!isMenuOpen && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu - Full width slide from left */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-gray-900 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 md:hidden`}
      >
        <div className="flex justify-end p-4">
          {/* Close Icon */}
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-white"
            aria-label="Close Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Links with closeMenu on click */}
        <div className="flex flex-col items-center space-y-6 p-8 text-lg">
          <Link href="/" onClick={closeMenu} className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link
            href="/dashboard"
            onClick={closeMenu}
            className="hover:text-gray-300 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/login"
            onClick={closeMenu}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded transition text-center mt-4 w-48"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            onClick={closeMenu}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded transition text-center w-48"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

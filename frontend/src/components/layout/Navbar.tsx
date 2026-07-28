'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export function Navbar() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl">🎙️</span>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              VoiceAI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition text-xl"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {user ? (
              <Link href={user.role === 'admin' ? '/admin' : '/user'}>
                <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full text-sm shadow-md hover:shadow-lg transition">
                  👤 {user.full_name}
                </span>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-5 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition font-medium">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200/50 dark:border-gray-800/50 px-4 py-4 space-y-3 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-200/50 dark:border-gray-800/50 flex flex-col gap-2">
            <button
              onClick={() => { toggleTheme(); setIsMenuOpen(false); }}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
            {user ? (
              <Link href={user.role === 'admin' ? '/admin' : '/user'} onClick={() => setIsMenuOpen(false)}>
                <span className="block px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full text-center">
                  👤 {user.full_name}
                </span>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
                    Login
                  </button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg transition">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
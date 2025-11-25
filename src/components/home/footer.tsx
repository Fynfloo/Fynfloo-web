'use client';

import { Instagram, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white">YourBrand</h3>
            <p className="mt-4 text-gray-400">
              Launch and manage your online store effortlessly with our
              all-in-one platform.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold">Product</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/signup"
                  className="hover:text-white transition-colors"
                >
                  Get Started
                </a>
              </li>
              <li>
                <a href="#cta" className="hover:text-white transition-colors">
                  Call to Action
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold">Resources</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Docs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API Reference
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold">Stay Updated</h4>
            <p className="mt-4 text-gray-400">
              Subscribe to our newsletter for product updates and tips.
            </p>
            <form className="mt-4 flex flex-col sm:flex-row sm:gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                className="mt-2 sm:mt-0 rounded-md bg-indigo-500 px-4 py-2 text-white font-semibold hover:bg-indigo-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-700" />

        {/* Bottom Row */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };

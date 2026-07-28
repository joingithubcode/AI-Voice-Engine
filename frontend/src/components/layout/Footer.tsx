import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">🎙️ VoiceAI</span>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Convert text to realistic AI voices with emotion, cloning, and 15+ languages.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.407-4.586 13.9 13.9 0 002.163-7.47 14.003 14.003 0 00-.527-3.772z"/></svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/features" className="hover:text-blue-600 transition">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-600 transition">Pricing</Link></li>
              <li><Link href="/docs" className="hover:text-blue-600 transition">Docs</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/about" className="hover:text-blue-600 transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-blue-600 transition">Blog</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/privacy" className="hover:text-blue-600 transition">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600 transition">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} VoiceAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
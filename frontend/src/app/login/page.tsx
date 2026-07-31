// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
// import { useAuth } from '../../context/AuthContext';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const params = useSearchParams();
//   const registered = params.get('registered');
//   const verified = params.get('verified');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       await login(email, password);
//     } catch (err: any) {
//       const errorMsg = err.response?.data?.detail || err.message || 'Login failed';
//       setError(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
//         <div className="text-center mb-6">
//           <span className="text-4xl">🎙️</span>
//           <h2 className="text-3xl font-bold text-gray-900 mt-2">Welcome Back</h2>
//           <p className="text-gray-600 text-sm mt-1">Sign in to your account</p>
//         </div>

//         {registered && (
//           <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
//             ✅ Registered successfully! Please check your email to verify.
//           </div>
//         )}

//         {verified && (
//           <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
//             ✅ Email verified! You can now login.
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//               placeholder="you@example.com"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//               placeholder="••••••••"
//               autoComplete="current-password"
//             />
//           </div>

//           {error && (
//             <div className="p-2 bg-red-100 text-red-600 text-sm rounded">{error}</div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>

//         <div className="mt-6 text-center text-sm text-gray-600">
//           Don't have an account?{' '}
//           <Link href="/register" className="text-blue-600 hover:underline">
//             Sign up
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const params = useSearchParams();
  const registered = params.get('registered');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || err.message || 'Login failed';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-6">
          <span className="text-4xl">🎙️</span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
        </div>

        {registered && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
            ✅ Registered successfully! You can now login.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              required
              placeholder="••••••••"
            />
          </div>

          {error && <div className="p-2 bg-red-100 text-red-600 text-sm rounded">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
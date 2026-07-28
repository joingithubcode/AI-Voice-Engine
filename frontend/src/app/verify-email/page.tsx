'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get('token');
  const { verifyEmail } = useAuth();

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided');
      return;
    }

    const verify = async () => {
      try {
        await verifyEmail(token);
        setStatus('success');
        setMessage('Email verified! Redirecting...');
        setTimeout(() => router.push('/login?verified=true'), 2000);
      } catch (err: any) {
        setStatus('error');
        setMessage(err.response?.data?.detail || 'Verification failed. Token expired.');
      }
    };
    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center">
        {status === 'loading' && (
          <>
            <div className="text-4xl mb-4">⏳</div>
            <h2 className="text-2xl font-bold">Verifying...</h2>
            <p className="text-gray-600 mt-2">{message}</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-600">Verified!</h2>
            <p className="text-gray-600 mt-2">{message}</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="text-4xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-600">Failed</h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <button
              onClick={() => router.push('/login')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
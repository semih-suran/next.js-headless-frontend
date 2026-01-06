'use client';

import { Suspense } from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-gray-500">
            Sign in to your account to view orders and preferences.
          </p>
        </div>
        
        <Suspense fallback={<div className="h-64 bg-gray-50 animate-pulse rounded" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
'use client';

import LandingPage from '@/components/LandingPage';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth');
  };

  const handleLogin = () => {
    router.push('/auth');
  };

  return (
    <LandingPage
      onGetStarted={handleGetStarted}
      onLogin={handleLogin}
    />
  );
}

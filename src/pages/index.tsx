import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (isAuthenticated) {
      router.push('/home');
    } else {
      router.push('/login');
    }
    router.push('/home');
  }, [router]);

  return null;
}

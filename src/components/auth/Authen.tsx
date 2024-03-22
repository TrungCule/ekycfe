import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import Author from './Author';

interface Props {
  children: ReactNode;
}

const Authen: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const handleAuthLogin = async () => {
      const Auth = await import('@/services/auth');

      Auth.login(() => {
        const accessToken = Auth.getTokenId();
        localStorage.setItem('token', accessToken);
      });
    };

    handleAuthLogin();
  }, [router]);
  
  return <Author renderContent={children} />;
};

export default Authen;

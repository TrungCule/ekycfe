import { useRouter } from 'next/router';
import RightHeader from './RightHeader';
import { ReactNode } from 'react';
import useAuth from '@/hooks/useAuth';

interface IProps {
  children: ReactNode;
}

export default function Header({ children }: IProps) {
  const router = useRouter();
  const navigateToHome = () => {
    router.push('/home');
  };

  if (
    router.pathname === '/login' ||
    router.pathname === '/register' ||
    router.pathname === '/base' ||
    router.pathname === '/forget_password' ||
    router.pathname === '/reset_password'
  ) {
    return null;
  }

  return (
    <div className="bg-primary text-yellow px-28 h-[64x] w-full">
      <div className="flex flex-col divide-y-2 divide-gray-200">
        {' '}
        {/* Add this */}
        <div className="flex justify-between">
          <div className="text-[3rem] mr-5 inline-flex">
            <div onClick={navigateToHome}>
            </div>
          </div>
          <RightHeader />
        </div>
        <div className="block items-center w-full max-w-[80%] h-[64px]">{children}</div>
      </div>
    </div>
  );
}

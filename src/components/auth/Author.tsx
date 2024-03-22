import hasPermission from '@/hooks/hasPermission';
import useAuth from '@/hooks/useAuth';
import Header from '@/layouts/default/header';
import Navbar from '@/layouts/default/navbar';
import { Result, Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';

interface Props {
  renderContent: ReactNode;
}

const Author: React.FC<Props> = ({ renderContent }) => {
  const [isAllowed, setIsAllowed] = useState<boolean>();
  const router = useRouter();
  const { userInfo } = useAuth();
  useEffect(() => {
    setIsAllowed(hasPermission(router.pathname, userInfo));
  }, [router, userInfo]);

  if (typeof isAllowed === 'undefined')
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin />
      </div>
    );

  return (
    <div className="flex overflow-x-hidden max-h-[100vh]">
      <main className="overflow-hidden flex-1 flex flex-col">
        {!isAllowed ? (
          <div className="flex-1 flex items-center justify-center">
            <Result status="403" title="403" subTitle="Xin lỗi, bạn không có quyền truy cập trang web này." />
          </div>
        ) : (
          renderContent
        )}
      </main>
    </div>
  );
};

export default Author;

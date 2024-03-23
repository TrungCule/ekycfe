import hasPermission from '@/hooks/hasPermission';
import useAuth from '@/hooks/useAuth';
import Header from '@/layouts/default/header';
import Navbar from '@/layouts/default/navbar';
import { getUserInfo } from '@/services/puppetService';
import { setUserName } from '@/store/auth';
import { useAppDispatch } from '@/store/hook';
import { Result, Spin, message } from 'antd';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';

interface Props {
  renderContent: ReactNode;
}

const Author: React.FC<Props> = ({ renderContent }) => {
  const [isAllowed, setIsAllowed] = useState<boolean>();
  const router = useRouter();
  const { userInfo } = useAuth();

  const dispatch = useAppDispatch();

  const getAuth = async () => {
    const result: any = await getUserInfo();
    if (result.error) message.error(result.error);
    dispatch(setUserName(result.data));
    setIsAllowed(hasPermission(router.pathname, result.data));
  };

  useEffect(() => {
    // getAuth()
    setIsAllowed(hasPermission(router.pathname, userInfo));
  }, [router, userInfo]);

  if (typeof isAllowed === 'undefined')
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );

  return (
    <div className="flex overflow-x-hidden max-h-[100vh]">
      <main className="flex flex-col flex-1 overflow-auto">
        {!isAllowed ? (
          <div className="flex items-center justify-center flex-1">
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

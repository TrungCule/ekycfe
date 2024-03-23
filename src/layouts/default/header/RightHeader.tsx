import { Avatar, Button, Dropdown, MenuProps, message } from 'antd';
import { useEffect } from 'react';
import { ArrowDownIcon, CreditIcon, LockIcon, LogOutIcon, SettingIcon, UserIcon } from '@/components/icons';
import { useRouter } from 'next/router';
import { setUserName } from '@/store/auth';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { getUserInfo } from '@/services/puppetService';
import { UserOutlined } from '@ant-design/icons';

export default function RightHeader() {
  const items: MenuProps['items'] = [
    {
      key: 'users',
      label: 'Quản lý users',
    },
    // {
    //   key: 'questions',
    //   label: 'Quản lý câu hỏi',
    // }, /account/change-password
    {
      key: 'change_password',
      label: 'Thay đổi mật khẩu',
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogOutIcon className="text-[1rem] inline-flex" />,
    },
  ];

  const userItems: MenuProps['items'] = [
    {
      key: 'user_info',
      label: 'Thông tin cá nhân',
      icon: <UserIcon className="text-[2rem] inline-flex" />,
    },
    {
      key: 'change_password',
      label: 'Thay đổi mật khẩu',
      icon: <CreditIcon className="text-[2rem] inline-flex" />,
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogOutIcon className="text-[2rem] inline-flex" />,
    },
  ];

  const dispatch = useAppDispatch();
  const router = useRouter();
  const getAuth = async () => {
    const result: any = await getUserInfo();
    if (result.error) message.error(result.error);
    dispatch(setUserName(result.data));
  };
  const { username, role } = useAppSelector((state) => state.auth);
  console.log(username, role);

  const handleLogOut = async () => {
    if (typeof window !== 'undefined') localStorage.clear();
    dispatch(setUserName({ user_name: null, role: null }));

    router.push('/login');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const meInfo = localStorage.getItem('token');
      if (meInfo) getAuth();
    }
  }, []);

  return (
    <div className="flex items-center gap-x-10">
      {username ? (
        <Dropdown
          trigger={['click']}
          menu={{
            items: role.map((r) => r.name).includes('ROLE_ADMIN') ? items : userItems,
            className: 'custom-menu-dropdown',
            onClick: (menuItem) => {
              if (menuItem.key === 'logout') {
                handleLogOut();
              } else {
                router.push(`/${menuItem.key}`);
              }
            },
          }}
        >
          <div className="flex items-center py-2 gap-x-3 hover:cursor-pointer">
            <Avatar className="bg-[#0071a9]" icon={<UserOutlined />} alt="avatar" size="large" />
            <div className="flex flex-col justify-center">
              <span className="text-[#627c92]">Xin chào!</span>
              <span className="text-black">{username}</span>
            </div>
            <ArrowDownIcon className="text-xl text-white" />
          </div>
        </Dropdown>
      ) : (
        <Button href="/login">Đăng nhập/ đăng ký</Button>
      )}
    </div>
  );
}

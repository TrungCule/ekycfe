import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { HomeIcon } from '@/components/icons';
import { RiBook3Line, RiCalendarEventLine, RiCopperDiamondLine } from 'react-icons/ri';
import { MdOutlineTheaterComedy } from 'react-icons/md';
import useAuth from '@/hooks/useAuth';


export default function Navbar() {
  const router = useRouter();
  const [current, setCurrent] = useState(router.pathname);
  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key);
    setCurrent(e.key);
  };
  const { userInfo } = useAuth();

  useEffect(() => {
    const routes = router.pathname.split('/');
    setCurrent(`/${routes[1]}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  const navItems = [
    {
      label: 'Trang chủ',
      icon: <HomeIcon />,
      path: '/home',
      key: '/home',
    },
    ...(userInfo?.role === 'admin' ? [{
      icon: <MdOutlineTheaterComedy />,
      key: '/users',
      label: 'Quản lý người dùng',
      path: '/users',
    }] : []),
  ];
  
  return (
    <Menu
      className="bg-primary text-[#0071a9] border-none custom-menu text-[16px] h-full"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={navItems}
    />
  );
}

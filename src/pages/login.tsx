import { login, register } from '@/services/auth';
import { getUserInfo } from '@/services/puppetService';
import { setUserName } from '@/store/auth';
import { useAppDispatch } from '@/store/hook';
import { Input, Button, Form, message } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hook';
import { GetServerSideProps } from 'next';

export default function Login() {
  const [type, setType] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(false);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    const token = localStorage.getItem('token');

    if (token) {
      router.replace('/home');
    } else {
      setLoading(false);
    }

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  // useEffect(() => {
  //   const isAuthenticated = !!localStorage.getItem('token');

  //   if (isAuthenticated) {
  //     router.push('/home');
  //   }
  // }, []);

  const getAuth = async () => {
    const result: any = await getUserInfo();

    if (result.error) message.error(result.error);

    dispatch(setUserName(result));
  };

  const handleFinish = async (values) => {
    if (!values || !values?.username || !values?.password)
      return message.error('Bạn cần điền đầy đủ tên đăng nhập và mật khẩu');

    if (!type) {
      const result: any = await register(values);
      if (result?.error) return message.error(result?.error);
      console.log(result);
      localStorage.setItem('token', result?.data?.token);
      // localStorage.setItem('refresh_token', result?.data?.refreshToken);
    } else {
      const result: any = await login(values);
      if (result?.error) return message.error(result?.error);
      localStorage.setItem('token', result?.token);
      // localStorage.setItem('refresh_token', result?.refresh_token);
    }
    getAuth();

    router.push('/home');
  };

  return (
      <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
        <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
          <h1 className="font-semibold text-2xl">Login</h1>
          <Form onFinish={handleFinish}>
            <div className="space-y-12 w-full sm:w-[400px]">
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="email">Email</label>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                  className="w-full mb-0"
                  name="username"
                >
                  <Input placeholder="Tên đăng nhập" className="h-[44px]" />
                </Form.Item>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <label>Mật khẩu</label>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                  className="w-full mb-0"
                  name="password"
                >
                  <Input type="password" placeholder="Password" className="h-[44px]" />
                </Form.Item>
              </div>
              {/* {error && <Alert>{error}</Alert>} */}
              <div className="w-full">
                <Form.Item className="w-full">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
          <>
            <div className='flex justify-start'>
              <span>
                <a className="text-blue-500 text-lg border cursor-pointer" onClick={() => router.push('/forget_password')}>
                  Quên mật khẩu
                </a>
              </span>
            </div>
            <p className="text-center">
              Nếu bạn chưa có tài khoản vui lòng{' '}
              <a className="text-blue-500 text-lg border cursor-pointer" onClick={() => router.push('/register')}>
                đăng ký
              </a>
            </p>
          </>
        </div>
      </div>
  );
}

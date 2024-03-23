import { login } from '@/services/auth';
import { getUserInfo } from '@/services/puppetService';
import { setUserName } from '@/store/auth';
import { useAppDispatch } from '@/store/hook';
import { Input, Button, Form, message } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import { useAppSelector } from '../store/hook';
// import { GetServerSideProps } from 'next';

export default function Login() {
  // const [type, setType] = useState<boolean>(true);
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
  }, [router]);

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
    console.log(result);
    dispatch(setUserName(result.data));
  };

  const handleFinish = async (values) => {
    if (!values || !values?.username || !values?.password)
      return message.error('You need to fill in your full username and password');

    // if (!type) {
    //   const result: any = await register(values);
    //   if (result?.error) return message.error(result?.error);
    //   console.log(result);
    //   localStorage.setItem('token', result?.data?.token);
    //   // localStorage.setItem('refresh_token', result?.data?.refreshToken);
    // } else {
    const result: any = await login(values);
    console.log(result);
    if (result?.error) return message.error(result?.error);
    localStorage.setItem('token', result?.id_token);
    // localStorage.setItem('refresh_token', result?.refresh_token);
    // }
    getAuth();

    router.push('/home');
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-slate-100">
      <div className="px-8 pt-12 pb-8 space-y-12 sm:shadow-xl sm:bg-white rounded-xl">
        <h1 className="text-2xl font-semibold">Login</h1>
        <Form onFinish={handleFinish}>
          <div className="space-y-12 w-full sm:w-[400px]">
            <div className="grid w-full items-center gap-1.5">
              <label htmlFor="email">Username</label>
              <Form.Item
                rules={[{ required: true, message: 'Enter your username' }]}
                className="w-full mb-0"
                name="username"
              >
                <Input placeholder="Tên đăng nhập" className="h-[44px]" />
              </Form.Item>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <label>Password</label>
              <Form.Item
                rules={[{ required: true, message: 'Enter your password' }]}
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
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                >
                  Login
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
        <>
          <div className="flex justify-start">
            <span>
              <a
                className="text-lg text-blue-500 border cursor-pointer"
                onClick={() => router.push('/forget_password')}
              >
                Forgot password?
              </a>
            </span>
          </div>
          <p className="text-center">
            If you don't have an account please{' '}
            <a
              className="text-lg text-blue-500 border cursor-pointer"
              onClick={() => router.push('/register')}
            >
              register
            </a>
          </p>
        </>
      </div>
    </div>
  );
}

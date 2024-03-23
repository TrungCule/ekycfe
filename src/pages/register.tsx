import { register } from '@/services/auth';
import { UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, message } from 'antd';
// import { Option } from 'antd/es/mentions';
import React from 'react';
import { useRouter } from 'next/router';

const RegisterPage = () => {
  const router = useRouter();

  const onFinish = async (values) => {
    const result: any = await register(values);
    if (result?.error) return message.error(result?.error);
    message.success('Đăng ký thành công!');
    router.push('/login');
  };

  const validatePassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject('Passwords do not match');
    },
  });

  return (
    <div className="flex items-center justify-center w-screen h-auto bg-slate-100">
      <div className="px-8 pt-12 pb-8 space-y-12 sm:shadow-xl sm:bg-white rounded-xl min-w-[500px] !my-4">
        <h1 className="text-2xl font-semibold">Create your Account</h1>
        <Form name="login-form" initialValues={{ remember: true }} onFinish={onFinish} labelAlign="left">
          {/* className="bg-white p-8 rounded-md shadow-md !mt-0 min-w-[500px]" */}
          {/* <div
            className='mb-4 cursor-pointer'
            onClick={() => router.push('/login')}
          >
            <ArrowLeftOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
          </div> */}
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="username" className="block my-2 text-sm font-bold text-gray-700">
              Username <span className="text-red-500">*</span>
            </label>
            <Form.Item name="username" rules={[{ required: true, message: 'Username is required' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="email" className="block my-2 text-sm font-bold text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Email is required' },
                {
                  type: 'email',
                  message: 'Invalid email',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="password" className="block my-2 text-sm font-bold text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Password is required' },
                { min: 6, message: 'Password must be minimum 6 characters' },
              ]}
              className="mb-4"
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="password" className="block my-2 text-sm font-bold text-gray-700">
              RePassword <span className="text-red-500">*</span>
            </label>

            <Form.Item
              name="retype_password"
              dependencies={['password']}
              rules={[{ required: true, message: 'RePassword is required' }, validatePassword]}
              className="mb-4"
            >
              <Input.Password placeholder="Repassword" />
            </Form.Item>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="password" className="block my-2 text-sm font-bold text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Form.Item
              name="fullname"
              rules={[{ required: true, message: 'Full Name is required' }]}
              className="mb-4"
            >
              <Input placeholder="Full Name" />
            </Form.Item>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="password" className="block my-2 text-sm font-bold text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Form.Item
              name="phone_number"
              rules={[
                { required: true, message: 'Phone Number is required' },
                { pattern: /^[0-9]+$/, message: 'Please enter a valid phone number' },
                { min: 10, message: 'Please enter a valid phone number' },
              ]}
              className="mb-4"
            >
              <Input placeholder="Phone Number" />
            </Form.Item>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="password" className="block my-2 text-sm font-bold text-gray-700">
              Address
            </label>
            <Form.Item name="address" className="mb-4">
              <Input placeholder="Address" />
            </Form.Item>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="password" className="block my-2 text-sm font-bold text-gray-700">
              Birthday
            </label>
            <Form.Item name="date_of_birth" className="mb-4">
              <DatePicker placeholder="Birthday" style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <div className="w-full">
            <Form.Item className="flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              >
                Sign up
              </Button>
            </Form.Item>
          </div>
          <p className="text-center">
            Have an account?{' '}
            <a className="text-lg border text-blue" onClick={() => router.push('/login')}>
              Login
            </a>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;

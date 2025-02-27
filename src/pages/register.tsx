import { register } from '@/services/auth';
import { ArrowLeftOutlined, CaretLeftOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select, message } from 'antd';
import { Option } from 'antd/es/mentions';
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

  const validatePassword = (_, value, callback) => {
    const { password, retypePassword } = value;

    if (password && retypePassword && password !== retypePassword) {
      callback('Passwords do not match');
    } else {
      callback();
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100 overflow-hidden">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12 overflow-hidden">
        <h1 className="font-semibold text-2xl">Create your Account</h1>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="bg-white p-8 rounded-md shadow-md !mt-0 min-w-[500px] overflow-hidden"
          labelAlign="left"
        >
          {/* <div
            className='mb-4 cursor-pointer'
            onClick={() => router.push('/login')}
          >
            <ArrowLeftOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
          </div> */}
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username <span className="text-red-500">*</span>
            </label>
            <Form.Item name="username" rules={[{ required: true, message: 'Username is required' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />} placeholder="Username" />
            </Form.Item>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <Form.Item name="email" rules={[{ required: true, message: 'Email is required' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />} placeholder="Email" />
            </Form.Item>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password <span className="text-red-500">*</span>
            </label>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Password is required' }]}
              className="mb-4"
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Nhập lại mật khẩu <span className="text-red-500">*</span>
            </label>

            <Form.Item
              name="retype_password"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Retype Password is required' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Passwords do not match');
                  },
                }),
              ]}
              className="mb-4"
            >
              <Input.Password placeholder="Nhập lại mật khẩu" />
            </Form.Item>
          </div>

          <Form.Item
            name="fullname"
            rules={[{ required: true, message: 'Full Name is required' }]}
            className="mb-4"
          >
            <Input placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            name="phone_number"
            rules={[
              { required: true, message: 'Phone Number is required' },
              { pattern: /^[0-9]+$/, message: 'Please enter a valid phone number' },
            ]}
            className="mb-4"
          >
            <Input placeholder="Phone Number" />
          </Form.Item>

          <Form.Item name="address" className="mb-4">
            <Input placeholder="Address" />
          </Form.Item>

          <Form.Item name="date_of_birth" className="mb-4">
            <DatePicker placeholder="Ngày sinh" style={{ width: '100%' }} />
          </Form.Item>


          <div className="w-full">
            <Form.Item className='flex justify-center'>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Đăng ký
              </Button>
            </Form.Item>
          </div>
          <p className="text-center">
            Have an account?{' '}
            <a className="text-blue text-lg border" onClick={() => router.push('/login')}>
              sign in
            </a>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;

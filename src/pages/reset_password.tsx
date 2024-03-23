import PageTitle from '@/modules/users/components/PageTitle';
import { resetPassword } from '@/services/auth';
import { Button, Form, Image, Input, Spin, message } from 'antd';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const reset_password = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    if (!values || !values?.email || !values?.verify_code) return message.error('Bạn cần điền email');
    setLoading(true);
    const res: AxiosResponse<any> = await resetPassword(values);
    setLoading(false);
    if (res?.error) return message.error(res.error);
    message.success('Vui lòng kiểm tra email, mật khẩu của bạn đã được đặt lại!');
    router.push('/login');
  };

  if (loading) return <Spin />;

  return (
    <>
      <Form onFinish={handleFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <div className="flex items-center w-full home bg-bg-body">
          <div className=" max-h-[720px] px-16 pt-8 pb-8 mx-auto mt-8 flex flex-col bg-white">
            <PageTitle title="Reset Passowrd" titleContent="" />
            <div className="flex flex-col gap-8 text-center login-page">
              {/* <h3 className="mt-2 mb-0 text-3xl font-bold text-dark">Đặt lại mật khẩu!</h3> */}
              {/* <Image
                src="https://res.cloudinary.com/dpnjutbws/image/upload/v1710121924/Eco_Vu_Hoang/logo_gyp0vt.svg"
                alt="logo"
              /> */}
              <div className="flex flex-col items-start text-xl font-semibold gap-y-1">
                <Form.Item
                  label="Email"
                  rules={[{ required: true, message: 'Enter your email' }]}
                  className="w-full mb-0"
                  name="email"
                >
                  <Input placeholder="Email" className="" />
                </Form.Item>
              </div>
              <div className="flex flex-col items-start text-xl font-semibold gap-y-1">
                <Form.Item
                  label="Verify Code"
                  rules={[{ required: true, message: 'Enter Verify Code' }]}
                  className="w-full mb-0"
                  name="verify_code"
                >
                  <Input placeholder="Verify Code" className="" />
                </Form.Item>
              </div>
              <Form.Item className="w-full">
                <Button
                  htmlType="submit"
                  size="large"
                  className="self-center btn-login bg-[#0071a9] text-[#fff]"
                >
                  Submit
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default reset_password;

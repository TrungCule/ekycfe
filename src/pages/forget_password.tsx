import { forgetPassword } from '@/services/auth';
import { Button, Form, Image, Input, Spin, message } from 'antd';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const forget_password = (values) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    if (!values || !values?.email)
      return message.error('Bạn cần điền email');
    setLoading(true);
    const res:AxiosResponse<any> = await forgetPassword(values);
    setLoading(false);
    if (res?.error) return message.error(res.error);
    message.success('Vui lòng kiểm tra email của bạn, chúng tôi đã gửi mã xác nhận!');
    router.push('/reset_password');
    };

    if (loading) return <Spin />;

  return (
    <>
      <Form onFinish={handleFinish}>
        <div className="home w-full bg-bg-body flex items-center">
          <div className=" max-h-[720px] px-16 pt-8 pb-8 mx-auto mt-8 flex flex-col bg-white">
            <div className="login-page text-center flex gap-8 flex-col">
              <h3 className="text-dark text-3xl font-bold mt-2 mb-0">Vui lòng nhập email của bạn !</h3>
              <div className="flex flex-col items-start gap-y-1 text-xl font-semibold">
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                  className="w-full mb-0"
                  name="email"
                >
                  <Input placeholder="Email" className="h-[44px]" />
                </Form.Item>
              </div>

              <Form.Item className="w-full">
                <Button htmlType="submit" size="large" className="self-center btn-login">
                  Xác nhận
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default forget_password;

import PageTitle from '@/modules/users/components/PageTitle';
import { forgetPassword } from '@/services/auth';
import { Button, Form, Image, Input, Spin, message } from 'antd';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const forget_password = (values) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    if (!values || !values?.email) return message.error('Bạn cần điền email');
    setLoading(true);
    const res: AxiosResponse<any> = await forgetPassword(values);
    setLoading(false);
    if (res?.error) return message.error(res.error);
    message.success('Vui lòng kiểm tra email của bạn, chúng tôi đã gửi mã xác nhận!');
    router.push('/reset_password');
  };

  if (loading) return <Spin />;

  return (
    <>
      <Form onFinish={handleFinish}>
        <div className="flex items-center w-full home bg-bg-body">
          <div className=" max-h-[720px] px-16 pt-8 pb-8 mx-auto mt-8 flex flex-col bg-white">
            <div className="flex flex-col gap-8 text-center login-page">
              <div className="flex flex-col items-start text-xl font-semibold gap-y-1">
                <PageTitle title="Forget Password" titleContent="" />
                <Form.Item
                  label="Enter your email"
                  rules={[
                    { required: true, message: 'Please enter your email !' },
                    { type: 'email', message: 'Invalid Email' },
                  ]}
                  className="w-full mb-0"
                  name="email"
                >
                  <Input placeholder="Email" className="" />
                </Form.Item>
              </div>

              <Form.Item className="w-full">
                <Button htmlType="submit" size="large" className="bg-[#0071a9] text-[#fff]">
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

export default forget_password;

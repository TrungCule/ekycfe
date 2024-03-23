import useAuth from '@/hooks/useAuth';
import PageTitle from '@/modules/users/components/PageTitle';
import { changePassword, updateUser } from '@/services/puppetService';
import { LockOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, message } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

const change_password = () => {
  const [form] = Form.useForm();
  const { userInfo } = useAuth();
  const router = useRouter();

  const onFinish = async (values) => {
    const updateData = {
      currentPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    const result: any = await changePassword(updateData);

    if (result.error) {
      return message.error(`Update failed: ${result.error.message}`);
    }
    message.success('Password updated successfully');
    router.push('/home');
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-slate-100">
      <div className="px-8 pt-12 pb-8 space-y-12 sm:shadow-xl sm:bg-white rounded-xl">
        <PageTitle title="Change Passowrd" titleContent="" />
        <div>
          <Form
            name="change_password"
            className="change-password-form"
            initialValues={{ remember: true }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, minWidth: 400 }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Old Password"
              name="oldPassword"
              rules={[{ required: true, message: 'Please input your old password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Old Password"
                className="hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: 'Please input your new password!' },
                { min: 6, message: 'Password must be minimum 6 characters.' },
                { max: 20, message: 'Password must be maximum 20 characters.' },
                {
                  pattern: /^(?=.*[A-Z])(?=.*[!@#$&*_])(?=.*[0-9])(?=.*[a-z]).{6,20}$/,
                  message: 'Password must include lower case, upper case, number and special character.',
                },
              ]}
              hasFeedback
            >
              <Input.Password
                className="hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="New Password"
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['newPassword']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            {/* <div>
              <ul>The new password must satisfy the following conditions:</ul>
              <li>
                Password must be 6-20 characters, including lowercase letters, uppercase letters, numbers and
                special characters
              </li>
            </div> */}
            <br />
            <hr />
            <div className="flex justify-end">
              <div className="flex items-center gap-4 my-2">
                <Button
                  type="default"
                  className="mr-2 bg-[#eff2f5]"
                  onClick={() => {
                    router.push('/home');
                  }}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" className="bg-[#0071a9]">
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default change_password;

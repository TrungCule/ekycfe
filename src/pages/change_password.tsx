import useAuth from '@/hooks/useAuth';
import PageTitle from '@/modules/users/components/PageTitle';
import { updateUser } from '@/services/puppetService';
import { LockOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, message } from 'antd';
import React from 'react';

const change_password = () => {
  const [form] = Form.useForm();
  const {userInfo} = useAuth();

  const onFinish = async (values) => {
    const updateData = {
      password: values.newPassword,
    };

    const result: any = await updateUser(updateData, userInfo?.id);

    if (result.error) {
        return message.error(`Update failed: ${result.error.message}`);
    }
    message.success('Password updated successfully');
  };

  return (
    <div className="px-28">
      <PageTitle title="Thay đổi mật khẩu" titleContent="Trang chủ / Thay đổi mật khẩu" />

      <div>
        <div className="mx-3 text-[14px] justify-between h-20 flex items-center">
          <h2>Đổi mật khẩu người dùng</h2>
        </div>

        <div>
          <Form
            name="change_password"
            className="change-password-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Mật khẩu cũ"
                    name="oldPassword"
                    rules={[{ required: true, message: 'Please input your old password!' }]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Mật khẩu cũ"
                      className="border-transparent hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[
                      { required: true, message: 'Please input your new password!' },
                      { min: 6, message: 'Password must be minimum 6 characters.' },
                      { max: 20, message: 'Password must be maximum 20 characters.' },
                      {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
                        message:
                          'Password must include lower case, upper case, number and special character.',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      className="border-transparent hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Mật khẩu mới"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Nhập lại mật khẩu mới"
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
                          return Promise.reject(
                            new Error('The two passwords that you entered do not match!')
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="Nhập lại mật khẩu mới" />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <div>
              <ul>Mật khẩu mới phải thỏa mãn các điều kiện sau:</ul>
              <li> Mật khẩu phải từ 6-20 ký tự, bao gồm cả chữ thường, in hoa, số và ký tự đặc biệt</li>
            </div>
            <br />
            <hr />
            <div className="flex justify-end">
              <div className="flex gap-4 my-2 items-center">
                <Button
                  type="default"
                  className="mr-2 bg-[#eff2f5]"
                  onClick={() => {
                    console.log('huy');
                  }}
                >
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit" className="bg-[#0071a9]">
                  Lưu
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

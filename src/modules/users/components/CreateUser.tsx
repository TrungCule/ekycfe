import { register } from '@/services/auth';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Select, message } from 'antd';
import { useRouter } from 'next/router';

export default function CreateUser({ open, onCancel, onOk }) {
  const [form] = Form.useForm();
  const onFinish = async () => {
    const allValues = form.getFieldsValue();
    onOk(allValues);
    form.resetFields();
  };

  return (
    <Modal title="Tạo người dùng mới" open={open} onOk={onFinish} onCancel={onCancel}>
      <Form className="bg-white rounded-md" labelAlign="left" form={form} onFinish={onFinish}>
        <h2 className="text-2xl font-bold mb-4">Đăng ký tài khoản</h2>

        <div className="mb-2">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username <span className="text-red-500">*</span>
          </label>
          <Form.Item name="username" rules={[{ required: true, message: 'Username is required' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Mật khẩu <span className="text-red-500">*</span>
          </label>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Password is required' }]}
            className="mb-4"
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
        </div>

        <div className="mb-2">
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

        <div className="mb-2">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <Form.Item name="email" rules={[{ required: true, message: 'Email is required' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
        </div>

        <div className="mb-2">
          <label htmlFor="fullname" className="block text-gray-700 text-sm font-bold mb-2">
            Họ tên <span className="text-red-500">*</span>
          </label>
          <Form.Item
            name="fullname"
            rules={[{ required: true, message: 'Full Name is required' }]}
            className="mb-4"
          >
            <Input placeholder="Họ tên" />
          </Form.Item>
        </div>

        <div className="mb-2">
          <label htmlFor="phone_number" className="block text-gray-700 text-sm font-bold mb-2">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <Form.Item
            name="phone_number"
            rules={[
              { required: true, message: 'Phone Number is required' },
              { pattern: /^[0-9]+$/, message: 'Please enter a valid phone number' },
            ]}
            className="mb-4"
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
        </div>

        <div className="mb-2">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Địa chỉ
          </label>
          <Form.Item name="address" className="mb-4">
            <Input placeholder="Địa chỉ" />
          </Form.Item>
        </div>

        <div className="mb-2">
          <label htmlFor="date_of_birth" className="block text-gray-700 text-sm font-bold mb-2">
            Ngày sinh
          </label>
          <Form.Item name="date_of_birth" className="mb-4">
            <DatePicker placeholder="Ngày sinh" style={{ width: '100%' }} />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

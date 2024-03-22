import PageTitle from '@/modules/users/components/PageTitle';
import { getUserById, updateUser } from '@/services/puppetService';
import { Button, Col, DatePicker, Form, Image, Input, Row, Select, Spin, Upload, message } from 'antd';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

interface UserData {
  id: number;
  username: string;
  email: string;
  address: string;
  fullname: string;
  avatar: string;
  phone_number: string;
  role: {
    id: number;
    name: string;
  };
  is_active: boolean;
  date_of_birth: number;
}

const User = () => {
  const [userData, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const router = useRouter();
  const { id } = router.query;
  const availableRoles = [
    { id: 1, name: 'Người dùng' },
    { id: 2, name: 'Quản trị viên' },
  ];
  const activeSelect = [
    { value: true, name: 'Active' },
    { value: false, name: 'Inactive' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: AxiosResponse<UserData> = await getUserById(id);
        data.date_of_birth = moment(data?.date_of_birth); // Convert timestamp to moment
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [id]);

  // useEffect(() => {
  //   if (userData && !userData.role) {
  //     setData((prevUserData) => ({
  //       ...prevUserData,
  //       role: { id: 0, name: '' },
  //     }));
  //   }
  // }, [userData]);

  const onFinish = async (values: any) => {
    values.role_id = values.role.id;
    delete values.role;
    console.log('Form values submitted:', values);

    const res: any = await updateUser(values, id);

    if (res.error) {
      return message.error(res?.error);
    }

    return message.success('Cập nhật thông tin thành công');
  };

  useEffect(() => {
    if (userData && !userData.role) {
      setData((prevUserData) => ({
        ...prevUserData,
        role: { id: 0, name: '' },
      }));
    }
  }, [userData]);

  const handleUploadChange = async (info) => {
    if (info.file.status === 'uploading') {
      setImageLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const response = info.file.response;
      setImageUrl(response.url);
      setImageLoading(false);
    } else if (info.file.status === 'error') {
      setImageLoading(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
  
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }
  
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  if (loading) {
    return <Spin />;
  }

  return (
    <>
      <div className="px-28">
        <PageTitle title="Thông tin cá nhân" titleContent="Trang chủ  / Thông tin cá nhân" />
        <Form layout="vertical" className="mt-8" initialValues={userData} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Username" name="username">
                <Input
                  disabled
                  placeholder="Username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Email" name="email">
                <Input
                  disabled
                  placeholder="Email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Address" name="address">
                <Input
                  placeholder="Address"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Full Name" name="fullName">
                <Input
                  placeholder="Full Name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Phone Number" name="phone_number">
                <Input
                  placeholder="Phone Number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Date of Birth" name="date_of_birth">
                <DatePicker className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Role" name={['role', 'id']}>
                <Select placeholder="Select a role" className="w-full" allowClear>
                  {availableRoles.map((role) => (
                    <Select.Option key={role.id} value={role.id}>
                      {role.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              {/* <Form.Item label="Active" name="is_active">
                <Select placeholder="Select a role" className="w-full" allowClear>
                  {activeSelect.map((status) => (
                    <Select.Option key={status.value} value={status.value}>
                      {status.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item> */}
            </Col>
            <Col span={8}>
            {/* <Form.Item label="Avatar" name="avatar">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleUploadChange}
              >
                {imageUrl ? (
                  <Image src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
          </Form.Item> */}
            </Col>
          </Row>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit" className="mt-4 bg-[#0071a9] mb-7">
              Cập nhật
            </Button>
          </div>
        </Form>
        <hr />
      </div>
    </>
  );
};

export default User;

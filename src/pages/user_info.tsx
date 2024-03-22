import Option from '@/components/Question/Option';
import PageTitle from '@/modules/users/components/PageTitle';
import { getUserInfo, updateUser } from '@/services/puppetService';
import { Button, Col, DatePicker, Form, Input, Row, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { AxiosResponse } from 'axios';

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

const user_info = () => {
  const [userData, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<UserData> = await getUserInfo();
        response.date_of_birth = moment(response.date_of_birth); // Convert timestamp to moment

        setData(response);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return <div>Loading...</div>; // Render a loading message while data is being fetched
  }

  const onFinish = async (values: any) => {
    console.log('Form values submitted:', values);

    const res: any = await updateUser(values, userData?.id);

    if (res.error) {
      return message.error(res?.error);
    }

    return message.success('Cập nhật thông tin thành công');
  };

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

export default user_info;

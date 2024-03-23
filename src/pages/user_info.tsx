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
  phoneNumber: string;
  role: {
    id: number;
    name: string;
  };
  is_active: boolean;
  dateOfBirth: number;
}

const user_info = () => {
  const [userData, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<UserData> = await getUserInfo();
        // response.date_of_birth = moment(response.date_of_birth); // Convert timestamp to moment
        console.log(response);
        response.data.user.dateOfBirth = moment(response?.data?.user.dateOfBirth);
        setData(response?.data?.user);
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
    const res: any = await updateUser(values);

    if (res.error) {
      return message.error(res?.error);
    }

    return message.success('Successfully updated');
  };

  return (
    <>
      <div className="px-28">
        <PageTitle title="Personal information" titleContent="" />
        <Form layout="vertical" className="mt-8" initialValues={userData} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Username" name="login">
                <Input
                  disabled
                  placeholder="Username"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Email" name="email">
                <Input
                  disabled
                  placeholder="Email"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Address" name="address">
                <Input
                  placeholder="Address"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="First Name" name="firstName">
                <Input
                  placeholder="First Name"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Last Name" name="lastName">
                <Input
                  placeholder="Last Name"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Phone Number" name="phoneNumber">
                <Input
                  placeholder="Phone Number"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Date of Birth" name="dateOfBirth">
                <DatePicker className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit" className="mt-4 bg-[#0071a9] mb-7">
              Update
            </Button>
          </div>
        </Form>
        <hr />
      </div>
    </>
  );
};

export default user_info;

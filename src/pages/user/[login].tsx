import PageTitle from '@/modules/users/components/PageTitle';
import { adminUpdateUser, getDetailUser, getUserById, updateUser } from '@/services/puppetService';
import { Button, Col, DatePicker, Form, Image, Input, Row, Select, Spin, Upload, message } from 'antd';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

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
  const [role, setRole] = useState('');

  const router = useRouter();
  const { login } = router.query;
  const availableRoles = [
    { id: 'ROLE_USER', name: 'Người dùng' },
    { id: 'ROLE_ADMIN', name: 'Quản trị viên' },
  ];


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp: AxiosResponse<UserData> = await getDetailUser(login);
        // data.date_of_birth = moment(data?.date_of_birth); // Convert timestamp to moment
        if (resp.dateOfBirth) {
          resp.dateOfBirth = moment(resp.dateOfBirth)
        }
        console.log(resp);
        if (resp.authorities?.includes("ROLE_ADMIN")) {
          setRole("ROLE_ADMIN")
        } else {
          setRole("ROLE_USER")
        }
        setData(resp);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [login]);

  const onFinish = async (values: any) => {
    values.role_id = values.role.id;
    delete values.role;
    console.log('Form values submitted:', values);
console.log(userData)
    const data = { ...userData, ...values }

    if (role === "ROLE_ADMIN") {
      data.authorities = ["ROLE_USER", "ROLE_ADMIN"]
    } else {
      data.authorities = ["ROLE_USER"]
    }

    const res: any = await adminUpdateUser(data);

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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setRole(value)
  };

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
              <Form.Item label="Username" name="login">
                <Input
                  placeholder="Username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Email" name="email">
                <Input
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
              <Form.Item label="First Name" name="firstName">
                <Input
                  placeholder="First Name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Last Name" name="lastName">
                <Input
                  placeholder="Last Name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Phone Number" name="phoneNumber">
                <Input
                  placeholder="Phone Number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Date of Birth" name="dateOfBirth">
                <DatePicker className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Role" name={['role', 'id']}>
                <Select defaultValue={role} placeholder="Select a role" className="w-full" allowClear onChange={handleChange}>
                  {availableRoles.map((role) => (
                    <Select.Option key={role.id} value={role.id}>
                      {role.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
            </Col>
            <Col span={8}>
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

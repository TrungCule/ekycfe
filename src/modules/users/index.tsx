import EditableCell from '@/components/EditableCell';
import { deleteUser, getUsers, updateUser } from '@/services/puppetService';
import { useQuery } from '@tanstack/react-query';
import { Button, Form, Input, message, Popconfirm, Table } from 'antd';
import { useState } from 'react';
import CreateUser from './components/CreateUser';
import { register } from '@/services/auth';
import { set } from 'lodash';
import { useRouter } from 'next/router';

const ROLE_MAP = {
  admin: 'Quản trị viên',
  user: 'Người dùng',
};

export default function Users() {
  // const [filteredUsers, setFilteredUsers] = useState([]);
  const router = useRouter();
  const userColumns = [
    {
      title: 'STT',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tài khoản',
      dataIndex: 'username',
      key: 'user_name',
      editable: true,
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
      editable: true,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
      key: 'phone_number',
      editable: false,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      editable: true,
    },
    {
      title: 'Đang hoạt động',
      dataIndex: 'isActive',
      key: 'isActive',
      editable: true,
      render: (_, record) => {
        return <span>{record?.is_active ? 'Đang hoạt động' : 'Đã khóa'}</span>;
      },
    },
    {
      title: 'Date of Birth',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
      editable: true,
      render: (_, record) => {
        // Create a new Date object using the timestamp
        const date = new Date(record?.date_of_birth);

        // Use Date methods to get the components of the date
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is zero-based, so add 1
        const year = date.getFullYear();

        // Format the date as a string
        const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;

        return <span>{formattedDate}</span>;
      },
      onCell: (record) => ({
        record,
        dataIndex: 'date_of_birth',
        title: 'Date of Birth',
        editing: isEditing(record),
        dateOfBirth: record?.date_of_birth, // Pass the value to the EditableCell component
      }),
    },
    {
      title: 'Phân quyền',
      dataIndex: 'role',
      key: 'role',
      editable: true,
      render: (_, record) => {
        return <span>{ROLE_MAP[record?.role.name]}</span>;
      },
    },
    {
      title: 'Tuỳ chọn',
      dataIndex: 'category',
      align: 'center',
      key: 'category',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button onClick={() => handleUpdate(record.id)} style={{ marginRight: 8 }}>
              Lưu
            </Button>
            <Button title="Sure to cancel?" onClick={cancel}>
              Huỷ
            </Button>
          </span>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {/* <Button disabled={editingKey !== ''} onClick={() => edit(record)}> */}
            <Button disabled={editingKey !== ''} onClick={() => router.push(`/user/${record.id}`)}>
              Sửa
            </Button>
            <Popconfirm title="Bạn có chắc chắn xoá?" onConfirm={() => handleDelete(record.id)}>
              <Button danger>Xoá</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const mergedColumns: any = userColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const {
    data: users,
    refetch,
    isFetching,
  } = useQuery(
    ['/users'],
    async () => {
      const res: any = await getUsers();
      if (res.error) {
        message.error(res.error);
        return [];
      }
      return res.users;
    },
    {
      staleTime: Infinity,
    }
  );

  const handleUpdate = async (id) => {
    const allValues = form.getFieldsValue();
    // console.log('allValues', allValues);
    const data = {
      user_name: allValues.user_name,
      // role: allValues.role,
      address: allValues.address,
      // is_active: allValues.is_active,
      full_name: allValues.full_name,
    };
    const result: any = await updateUser(data, id);
    if (result.error) return message.error(result.error);
    setEditingKey('');
    refetch();
  };

  const handleAddNew = async (allValues) => {
    const result: any = await register(allValues);
    if (result.error) return message.error(result.error);
    message.success('Thêm mới người dùng thành công');
    setOpen(false);
    refetch();
  };

  const handleDelete = async (id) => {
    const result: any = await deleteUser({ id });
    if (result.error) return message.error(result.error);
    refetch();
  };

  const handleSearch = (event) => {
    // console.log(.target.value)
    setSearchTerm(event.target.value);
    // setFilteredUsers(filteredUsers);
  };

  const handleRefresh = () => {
    refetch();
  };

  const filteredUsers = users
    ? users.filter(
        (user) =>
          user.username.includes(searchTerm) ||
          user.fullName.includes(searchTerm) ||
          user.phone_number.includes(searchTerm)
      )
    : [];

  return (
    <div className="py-8 overflow-y-auto px-28 flex flex-col gap-4 items-start mx-auto min-w-full">
      <div className="flex justify-between gap-4 mb-4 w-full">
        <Input.Search className="w-[50%]" placeholder="Search..." onChange={handleSearch} />
        <div className="flex justify-center items-center gap-3">
          <Button
            className="bg-[#0071a9] text-[#ffffff] hover:bg-[#004f76] hover:text-[#ffffff]"
            onClick={() => setOpen(true)}
          >
            Thêm người dùng
          </Button>
          <Button onClick={handleRefresh}>Refresh</Button>
        </div>
      </div>
      <Form form={form} component={false}>
        <div>Tổng số bản ghi: {users?.length}</div>
        <Table
          className="w-full custom-table"
          rowKey={(record) => record.id}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          pagination={{
            total: filteredUsers?.length,
            defaultPageSize: 3, // Change this to the number of items you want per page
          }}
          columns={mergedColumns}
          dataSource={filteredUsers}
          loading={isFetching}
        />
      </Form>
      <CreateUser open={open} onOk={handleAddNew} onCancel={() => setOpen(false)}></CreateUser>
    </div>
  );
}

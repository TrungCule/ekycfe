import { DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const DIFF_OPTIONS = [
  {
    value: 'hard',
    label: 'Khó',
  },
  {
    value: 'medium',
    label: 'Trung bình',
  },
  {
    value: 'easy',
    label: 'Dễ',
  },
];

const ROLE_OPTIONS = [
  {
    value: 2,
    label: 'admin',
  },
  {
    value: 1,
    label: 'user',
  },
];


const EditableCell: React.FC<any> = ({ editing, dataIndex, title, children, dateOfBirth, ...restProps }) => {
  if (!editing) return <td {...restProps}>{children}</td>;

  if (dataIndex === 'difficulty')
    return (
      <td {...restProps}>
        <Form.Item
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Select options={DIFF_OPTIONS} />
        </Form.Item>
      </td>
    );

  if (dataIndex === 'role')
    return (
      <td {...restProps}>
        <Form.Item
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Select options={ROLE_OPTIONS} />
        </Form.Item>
      </td>
    );

    if (dataIndex === 'isActive') {
      return (
        <td {...restProps}>
          <Form.Item
            name={dataIndex}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <Select options={[{ value: true, label: 'Đang hoạt động' }, { value: false, label: 'Khóa' }]} />
          </Form.Item>
        </td>
      );
    }
  
  //   if (dataIndex === 'date_of_birth') {
  // return (
  //   <td {...restProps}>
  //     <Form.Item
  //       name={dataIndex}
  //       rules={[
  //         {
  //           required: true,
  //           message: `Please Input ${title}!`,
  //         },
  //       ]}
  //     >
  //       <DatePicker
  //         format="DD/MM/YYYY"
  //         defaultValue={dayjs("2015-06-06", { format: "YYYY-MM-DD" })}
  //       />

  //     </Form.Item>
  //   </td>
  // );
  //   }

  return (
    <td {...restProps}>
      <Form.Item
        name={dataIndex}
        style={{ margin: 0 }}
        rules={[
          {
            required: true,
            message: `Please Input ${title}!`,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </td>
  );
};

export default EditableCell;

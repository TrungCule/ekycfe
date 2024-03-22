import { Button, Modal } from 'antd';

export default function loginRequest({ open, onCancel }) {
  const footer = <Button href="/login">Đăng nhập</Button>;

  return (
    <Modal onCancel={onCancel} open={open} footer={footer} title="Thông báo">
      Vui lòng đăng nhập để thực hiện chức năng này!
    </Modal>
  );
}

import { Modal } from "antd";

const CSModal = ({
  children,
  title,
  isModalOpen,
  handleOk,
  handleCancel,
  footer,
}) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={footer}
    >
      {children}
    </Modal>
  );
};

export default CSModal;

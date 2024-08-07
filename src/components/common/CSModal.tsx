/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { ReactNode } from "react";

const CSModal = ({
  children,
  title,
  isModalOpen,
  handleOk,
  handleCancel,
  footer,
}: {
  children: ReactNode;
  title: string;
  isModalOpen: boolean;
  handleOk?: () => any;
  handleCancel: () => any;
  footer: any;
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

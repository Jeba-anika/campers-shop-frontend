/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";
const CSInput = ({
  label,
  name,
  rules,
}: {
  label: string;
  name: string;
  rules: any;
}) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Input />
    </Form.Item>
  );
};

export default CSInput;

import { Form, Input } from "antd";
const CSInput = ({ label, name, rules }) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Input />
    </Form.Item>
  );
};

export default CSInput;

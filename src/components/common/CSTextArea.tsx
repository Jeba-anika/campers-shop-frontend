import { Form, Input } from "antd";
const { TextArea } = Input;

const CSTextArea = ({
  label,
  name,
  rules = [],
  placeholder = "",
  rows = 4,
}: {
  label: string;
  name: string;
  rules?: object[];
  placeholder?: string;
  rows?: number;
}) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <TextArea rows={rows} placeholder={placeholder} />
    </Form.Item>
  );
};

export default CSTextArea;

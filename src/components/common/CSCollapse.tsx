import type { CollapseProps } from "antd";
import { Collapse } from "antd";

const CSCollapse = ({
  items,
  defaultActiveKey = ["1"],
  styles,
}: {
  items: CollapseProps["items"];
  defaultActiveKey?: string[];
  styles?: string;
}) => {
  return (
    <Collapse
      className={`mt-10 bg-tertiary border border-primary ${styles} text-primary`}
      items={items}
      defaultActiveKey={defaultActiveKey}
      //onChange={onChange}
    />
  );
};

export default CSCollapse;

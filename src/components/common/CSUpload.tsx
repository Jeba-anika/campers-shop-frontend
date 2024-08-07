/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";

const CSUpload = ({
  fileList,
  handleUploadChange,
}: {
  fileList: any[];
  handleUploadChange: any;
}) => {
  return (
    <Upload
      multiple
      listType="picture-card"
      fileList={fileList}
      onChange={handleUploadChange}
      beforeUpload={() => false} // Prevent automatic upload
    >
      {fileList.length >= 8 ? null : (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      )}
    </Upload>
  );
};

export default CSUpload;

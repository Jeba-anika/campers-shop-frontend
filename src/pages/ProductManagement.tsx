import { DeleteOutlined } from "@ant-design/icons";
import type { FormProps, TableProps } from "antd";
import { Button, Form, Input, message, Select, Space, Spin, Table } from "antd";
import { UploadFile } from "antd/es/upload/interface";
import { useState } from "react";
import CSInput from "../components/common/CSInput";
import CSModal from "../components/common/CSModal";
import CSTextArea from "../components/common/CSTextArea";
import CSUpload from "../components/common/CSUpload";
import { useGetCategoriesQuery } from "../redux/features/categories/categoryApi";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../redux/features/products/productApi";

const { TextArea } = Input;

interface DataType {
  _id: string;
  category: { _id: string; categoryName: string; image: string };
  productName: string;
  brand: string;
  price: number;
  stockQuantity: number;
  soldCount: number;
  isAvailable: boolean;
  features: object[];
  specifications: object[];
  extraInfo: object[];
  description: string;
  isDeleted: boolean;
}
const ProductManagement = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { data: productData, isLoading } = useGetProductsQuery(null);
  const { data: categories } = useGetCategoriesQuery(null);
  const [createProduct, { isLoading: isCreateProductLoading }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: isDeleteProductLoading }] =
    useDeleteProductMutation();
  //State for product image file list//
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories?.data[0]._id || ""
  );
  const [selectProduct, setSelectedProduct] = useState({});
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "productName",
      key: "productName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (_, { category }) => <>{category?.categoryName}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              console.log(record);
              setIsEditProductModalOpen(true);
              setSelectedProduct(record);
              form.setFieldsValue(record);
            }}
          >
            Update
          </Button>
          <Button
            onClick={() => {
              setIsConfirmDeleteModalOpen(true);
              setSelectedProduct(record);
            }}
            danger
            shape="circle"
            icon={<DeleteOutlined />}
          ></Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] =
    productData?.data?.map((product: DataType) => ({
      key: product._id,
      ...product,
    })) || [];

  const showAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };
  const showEditProductModal = () => {
    setIsEditProductModalOpen(true);
  };

  const handleAddProductModalOk = () => {
    setIsAddProductModalOpen(false);
  };
  const handleEditProductModalOk = () => {
    setIsEditProductModalOpen(false);
  };

  const handleEditProductModalCancel = () => {
    setIsEditProductModalOpen(false);
    setSelectedProduct({});
    form.resetFields();
    setFileList([]);
    setSelectedCategoryId("");
  };
  const handleAddProductModalCancel = () => {
    setIsAddProductModalOpen(false);
    form.resetFields();
    setFileList([]);
    setSelectedCategoryId("");
  };

  type FieldType = {
    category?: string;
    productName?: string;
    brand?: string;
    price?: number;
    stockQuantity?: number;
    features?: object[];
    specifications?: object[];
    extraInfo?: object[];
    description?: string;
  };

  const transFormStrIntoKeyVal = (str: string) => {
    return str.split(",").map((feat) => {
      const key = feat.split(":")[0];
      const val = feat.split(":")[1];
      return { [key]: val };
    });
  };

  const handleAddProductSubmit: FormProps<FieldType>["onFinish"] = async (
    values
  ) => {
    const formData = new FormData();
    const product = {
      ...values,
      features: transFormStrIntoKeyVal(values?.features),
      specifications: transFormStrIntoKeyVal(values?.specifications),
      category: selectedCategoryId,
      price: Number(values.price),
      stockQuantity: Number(values.stockQuantity),
    };
    console.log(product);
    formData.append("data", JSON.stringify(product));
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      }
    });
    const res = await createProduct(formData);
    console.log(res);
    if (res?.data) {
      messageApi.success("Product cretaed!");
      setIsAddProductModalOpen(false);
      form.resetFields();
      setFileList([]);
      setSelectedCategoryId("");
    } else {
      messageApi.error(res?.error?.data?.message);
    }
  };

  //function for handling product image upload//
  const handleUploadChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(newFileList);
  };

  const handleCategoryChange = (value: string) => {
    // console.log(
    //   categories?.data?.find((category) => category._id === selectedCategoryId)
    //     ? categories?.data?.find(
    //         (category) => category._id === selectedCategoryId
    //       ).categoryName
    //     : ""
    // );

    const category = categories?.data?.find(
      (category) => category.categoryName === value
    );
    setSelectedCategoryId(category._id);
  };

  const handleDeleteProduct = async () => {
    const res = await deleteProduct(selectProduct._id);
    if (res?.data) {
      messageApi.success("Product Deleted Successfully!");
      setIsConfirmDeleteModalOpen(false);
    } else {
      messageApi.error(res?.error?.data?.message);
      setIsConfirmDeleteModalOpen(false);
    }
  };

  return (
    <div className="p-10">
      {contextHolder}
      {isLoading ? (
        <Spin fullscreen />
      ) : (
        <div>
          <Button className="mb-8" type="primary" onClick={showAddProductModal}>
            Add Product
          </Button>
          <Table columns={columns} dataSource={data} />
          <CSModal
            title={isAddProductModalOpen ? "Add Product" : "Edit Product"}
            isModalOpen={isAddProductModalOpen || isEditProductModalOpen}
            handleCancel={
              isAddProductModalOpen
                ? handleAddProductModalCancel
                : handleEditProductModalCancel
            }
            handleOk={
              isEditProductModalOpen
                ? handleAddProductModalOk
                : handleEditProductModalOk
            }
            footer={null}
          >
            <Form
              form={form}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={handleAddProductSubmit}
              autoComplete="off"
            >
              <CSInput
                label="Product Name"
                name="productName"
                rules={[
                  { required: true, message: "Please input Product Name!" },
                ]}
              />
              <Form.Item<FieldType> label="Select Category">
                <Select
                  style={{ width: 120 }}
                  value={
                    categories?.data?.find(
                      (category) => category._id === selectedCategoryId
                    )
                      ? categories?.data?.find(
                          (category) => category._id === selectedCategoryId
                        ).categoryName
                      : ""
                  }
                  options={
                    categories?.data?.map((category) => ({
                      value: category.categoryName,
                      label: category.categoryName,
                    })) || []
                  }
                  onSelect={handleCategoryChange}
                />
              </Form.Item>
              <Form.Item<FieldType> label="Product Images">
                <CSUpload
                  fileList={fileList}
                  handleUploadChange={handleUploadChange}
                />
              </Form.Item>
              <Form.Item<FieldType>
                label="Brand"
                name="brand"
                rules={[
                  { required: true, message: "Please input Brand Name!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input Description!" },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <CSInput
                label="Price"
                name="price"
                rules={[
                  { required: true, message: "Please input Price!" },
                  {
                    pattern: /^[+-]?(\d+(\.\d*)?|\.\d+)$/,
                    message: "Price should be a number",
                  },
                ]}
              />
              <CSInput
                label="Stock Quantity"
                name="stockQuantity"
                rules={[
                  { required: true, message: "Please input Stock Quantity!" },
                  {
                    pattern: /^[+-]?(\d+(\.\d*)?|\.\d+)$/,
                    message: "Stock Quantity should be a number",
                  },
                ]}
              />
              <CSTextArea
                label="Features"
                name="features"
                rules={[
                  { required: true, message: "Please input Features" },
                  {
                    pattern: /^(\s*\w+:\w+\s*)(,\s*\w+:\w+\s*)*$/,
                    message:
                      "Please input features like feature_name: feature_value",
                  },
                ]}
                placeholder="feature1:value,feature2:value..."
              />

              <CSTextArea
                label="Specifications"
                name="specifications"
                rules={[
                  { required: true, message: "Please input Specifications" },
                  {
                    pattern: /^(\s*\w+:\w+\s*)(,\s*\w+:\w+\s*)*$/,
                    message:
                      "Please input specifications like spec_name: spec_value",
                  },
                ]}
                placeholder="spec1:value,spec2:value..."
              />

              <CSTextArea label="Extra Info" name="extraInfo" rows={4} />

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  loading={isCreateProductLoading}
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </CSModal>
          <CSModal
            footer={() => (
              <>
                <Button
                  danger
                  loading={isDeleteProductLoading}
                  onClick={handleDeleteProduct}
                >
                  Delete
                </Button>
              </>
            )}
            isModalOpen={isConfirmDeleteModalOpen}
            handleCancel={() => setIsConfirmDeleteModalOpen(false)}
            handleOk={handleDeleteProduct}
            title={"Confirm Delete"}
          >
            <p>
              Are you sure you want to delete the product{" "}
              {selectProduct?.productName}
            </p>
          </CSModal>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;

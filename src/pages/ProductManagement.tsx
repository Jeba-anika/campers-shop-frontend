/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined } from "@ant-design/icons";
import type { FormProps, TableProps } from "antd";
import { Button, Form, Input, message, Select, Space, Spin, Table } from "antd";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import { useState } from "react";
import { Link } from "react-router-dom";
import CSButton from "../components/common/CSButton";
import CSInput from "../components/common/CSInput";
import CSModal from "../components/common/CSModal";
import CSTextArea from "../components/common/CSTextArea";
import CSUpload from "../components/common/CSUpload";
import { useGetCategoriesQuery } from "../redux/features/categories/categoryApi";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../redux/features/products/productApi";
import { TCategory, TProduct } from "../types/product/product.types";

const { TextArea } = Input;

// interface DataType {
//   _id: string;
//   category: { _id: string; categoryName: string; image: string };
//   productName: string;
//   brand: string;
//   price: number;
//   stockQuantity: number;
//   soldCount: number;
//   isAvailable: boolean;
//   features: object[];
//   specifications: object[];
//   extraInfo: object[];
//   description: string;
//   isDeleted: boolean;
// }
const ProductManagement = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { data: productData, isLoading } = useGetProductsQuery(null);
  const { data: categories } = useGetCategoriesQuery(null);
  const [createProduct, { isLoading: isCreateProductLoading }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdateProductLoading }] =
    useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleteProductLoading }] =
    useDeleteProductMutation();
  //---------State for product image file list-------//
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories?.data[0]._id || ""
  );
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const productColumns: TableProps<TProduct>["columns"] = [
    {
      title: "Name",
      dataIndex: "productName",
      key: "productName",
      render: (text) => <Link to={``}>{text}</Link>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <p>$ {text}</p>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (_, { category }: TProduct) => <>{category?.categoryName}</>,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: TProduct) => (
        <Space size="middle">
          <CSButton
            styles="px-2 rounded hover:text-cs-bg"
            onClick={async () => {
              console.log(record);
              const featureString = record.features.map(
                (feature) =>
                  `${Object.keys(feature)[0]}:${Object.values(feature)[0]}`
              );
              const specString = record.specifications.map(
                (spec: any) =>
                  `${Object.keys(spec)[0]}:${Object.values(spec)[0]}`
              );
              const extraInfoString = record?.extraInfo?.map(
                (info: any) =>
                  `${Object.keys(info)[0]}:${Object.values(info)[0]}`
              );
              const modifiedImageList = [];
              for (let i = 0; i < record.productImagesLink.length; i++) {
                const response = await fetch(record.productImagesLink[i].url);

                const blob = await response.blob();
                const file = new File(
                  [blob],
                  record.productImagesLink[i].altText
                );
                const rcFile: RcFile = {
                  ...file,
                  uid: "-1",
                  lastModified: file.lastModified,
                  lastModifiedDate: new Date(file.lastModified),
                  name: file.name,
                  size: file.size,
                  type: file.type,
                  webkitRelativePath: file.webkitRelativePath,
                };

                modifiedImageList.push({
                  uid: rcFile.uid,
                  lastModifiedDate: new Date(),
                  name: record.productImagesLink[i].altText,
                  url: URL.createObjectURL(file),
                  originFileObj: rcFile,
                });
              }
              console.log(modifiedImageList);
              setSelectedProduct(record);
              setFileList(modifiedImageList);
              setSelectedCategoryId(record.category._id);
              form.setFieldsValue(record);
              form.setFieldValue("features", featureString.toString());
              form.setFieldValue("specifications", specString.toString());
              form.setFieldValue("extraInfo", extraInfoString?.toString());
              setIsEditProductModalOpen(true);
            }}
          >
            Update
          </CSButton>

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

  const products: TProduct[] =
    productData?.data?.map((product: TProduct) => ({
      key: product._id,
      ...product,
    })) || [];

  const showAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const handleEditProductModalCancel = () => {
    setIsEditProductModalOpen(false);
    setSelectedProduct(null);
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

  type ProductFieldType = {
    category?: string;
    productName?: string;
    brand?: string;
    price?: number;
    stockQuantity?: number;
    features?: string;
    specifications?: string;
    extraInfo?: string;
    description?: string;
  };

  const transFormStrIntoKeyVal = (str: string) => {
    if (!str) {
      return [];
    }
    return str.split(",").map((feat) => {
      const key = feat.split(":")[0];
      const val = feat.split(":")[1];
      return { [key]: val };
    });
  };

  const handleAddProductSubmit: FormProps<ProductFieldType>["onFinish"] =
    async (values) => {
      try {
        console.log(values);
        const formData = new FormData();
        const product = {
          ...values,
          features: transFormStrIntoKeyVal(values?.features as string),
          specifications: transFormStrIntoKeyVal(
            values?.specifications as string
          ),
          extraInfo: transFormStrIntoKeyVal(values?.extraInfo as string),
          category: selectedCategoryId,
          price: Number(values.price),
          stockQuantity: Number(values.stockQuantity),
        };
        console.log(product);
        formData.append("data", JSON.stringify(product));
        console.log(fileList);
        fileList.forEach((file) => {
          console.log(file.originFileObj);
          if (file.originFileObj) {
            formData.append("images", file.originFileObj);
          }
        });
        let res: any = {};
        if (isAddProductModalOpen) {
          res = await createProduct(formData);
        } else if (isEditProductModalOpen) {
          res = await updateProduct({
            productId: selectedProduct?._id,
            updatedProduct: formData,
          });
        }
        console.log(res);
        if (res?.data) {
          messageApi.success(
            isAddProductModalOpen ? "Product cretaed!" : "Product Updated"
          );
          setIsAddProductModalOpen(false);
          setIsEditProductModalOpen(false);
          form.resetFields();
          setFileList([]);
          setSelectedCategoryId("");
        } else {
          messageApi.error(res?.error?.data?.message);
        }
      } catch (err: any) {
        message.error(err);
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
      (category: TCategory) => category.categoryName === value
    );
    setSelectedCategoryId(category._id);
  };

  const handleDeleteProduct = async () => {
    const res: any = await deleteProduct(selectedProduct?._id);
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
        <div className="text-primary">
          <h2 className="text-3xl mb-5 text-center">Product Management</h2>
          <div className="text-end mb-4">
            <CSButton
              styles="px-6 py-2 rounded hover:text-cs-bg"
              onClick={showAddProductModal}
            >
              Add Product
            </CSButton>
          </div>
          {/* -----------------product details table------------- */}
          <Table
            columns={productColumns}
            dataSource={products}
            rowClassName={"text-primary"}
          />
          {/* --------------------------------------------------------- */}
          {/* -----------------Add or Edit product modal--------------- */}
          <CSModal
            title={isAddProductModalOpen ? "Add Product" : "Edit Product"}
            isModalOpen={isAddProductModalOpen || isEditProductModalOpen}
            handleCancel={
              isAddProductModalOpen
                ? handleAddProductModalCancel
                : handleEditProductModalCancel
            }
            footer={null}
          >
            <Form
              form={form}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              style={{ maxWidth: 600 }}
              // initialValues={{ remember: true }}
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
              <Form.Item<ProductFieldType> label="Select Category">
                <Select
                  style={{ width: 120 }}
                  value={
                    categories?.data?.find(
                      (category: TCategory) =>
                        category._id === selectedCategoryId
                    )
                      ? categories?.data?.find(
                          (category: TCategory) =>
                            category._id === selectedCategoryId
                        ).categoryName
                      : ""
                  }
                  options={
                    categories?.data?.map((category: TCategory) => ({
                      value: category.categoryName,
                      label: category.categoryName,
                    })) || []
                  }
                  onSelect={handleCategoryChange}
                />
              </Form.Item>
              <Form.Item<ProductFieldType> label="Product Images">
                <CSUpload
                  fileList={fileList}
                  handleUploadChange={handleUploadChange}
                />
              </Form.Item>
              <Form.Item<ProductFieldType>
                label="Brand"
                name="brand"
                rules={[
                  { required: true, message: "Please input Brand Name!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item<ProductFieldType>
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
                  loading={isCreateProductLoading || isUpdateProductLoading}
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
              {selectedProduct?.productName}
            </p>
          </CSModal>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;

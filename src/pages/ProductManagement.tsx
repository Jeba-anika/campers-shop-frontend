import type { TableProps } from "antd";
import { Space, Spin, Table } from "antd";
import { useGetProductsQuery } from "../redux/features/products/productApi";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const ProductManagement = () => {
  const { data: productData, isLoading } = useGetProductsQuery(null);
  console.log(productData?.data);
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
      dataIndex: "categoryId",
      key: "category",
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] =
    productData?.data?.map((product) => ({
      key: product._id,
      ...product,
    })) || [];
  console.log(data);

  //   [
  //     {
  //       key: "1",
  //       name: "John Brown",
  //       age: 32,
  //       address: "New York No. 1 Lake Park",
  //       tags: ["nice", "developer"],
  //     },
  //     {
  //       key: "2",
  //       name: "Jim Green",
  //       age: 42,
  //       address: "London No. 1 Lake Park",
  //       tags: ["loser"],
  //     },
  //     {
  //       key: "3",
  //       name: "Joe Black",
  //       age: 32,
  //       address: "Sydney No. 1 Lake Park",
  //       tags: ["cool", "teacher"],
  //     },
  //   ];
  return (
    <div className="p-10">
      {isLoading ? (
        <Spin fullscreen />
      ) : (
        <Table columns={columns} dataSource={data} />
      )}
    </div>
  );
};

export default ProductManagement;

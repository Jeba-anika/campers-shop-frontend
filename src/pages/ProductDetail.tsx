import type { CollapseProps } from "antd";
import { Collapse, Spin } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../redux/features/products/productApi";

const ProductDetail = () => {
  const { productId } = useParams();
  const { data, isLoading } = useGetProductQuery(productId);
  console.log(data);
  const [quntity, setQuantity] = useState(0);
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Description",
      children: <p>{data?.data?.description}</p>,
    },
    {
      key: "2",
      label: "Features",
      children: (
        <>
          {data?.data?.features.map((feature) => (
            <p>
              - {Object.keys(feature)[0]} : {Object.values(feature)}[0]
            </p>
          ))}
        </>
      ),
    },
    {
      key: "3",
      label: "Specifications",
      children: (
        <>
          {data?.data?.specifications.map((spec) => (
            <p>
              - {Object.keys(spec)[0]} : {Object.values(spec)}[0]
            </p>
          ))}
        </>
      ),
    },
  ];
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  if (isLoading) {
    return <Spin fullscreen />;
  }
  return (
    <div className="grid grid-cols-2 p-12">
      <div>
        <img
          className="w-[500px] h-[500px]"
          src={data.data.productImagesLink[0].url}
        />
      </div>
      <div>
        <h3 className="text-6xl ">{data?.data?.productName}</h3>
        <p className="text-highlight text-3xl mt-4">${data?.data?.price}</p>
        <p className="text-highlight text-xl mt-5">
          <span className="text-cs-ash font-bold">By</span> {data?.data?.brand}
        </p>
        <div className="flex gap-3 mt-10">
          <button
            className="border border-cs-ash px-4 py-1 hover:bg-cs-ash rounded"
            onClick={() => setQuantity(quntity + 1)}
          >
            +
          </button>
          <p className="border border-cs-ash px-4 py-1 rounded text-center text-3xl">
            {quntity}
          </p>
          <button
            className="border border-cs-ash px-4 py-1 hover:bg-cs-ash rounded text-center"
            onClick={() => setQuantity(quntity > 0 ? quntity - 1 : 0)}
          >
            -
          </button>
        </div>
        <button
          disabled={data?.data?.isAvailable}
          className="mt-8  w-full border border-cs-ash hover:bg-neutral rounded"
        >
          Add to Cart
        </button>
        <Collapse
          className="mt-10"
          items={items}
          defaultActiveKey={["1"]}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default ProductDetail;

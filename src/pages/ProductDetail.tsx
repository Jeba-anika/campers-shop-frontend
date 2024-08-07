import type { CollapseProps } from "antd";
import { Image, message, Rate, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CSButton from "../components/common/CSButton";
import CSCollapse from "../components/common/CSCollapse";
import { addToCart } from "../redux/features/cart/cartSlice";
import { useGetProductQuery } from "../redux/features/products/productApi";
import { useAppDispatch } from "../redux/hooks";
import { TProductImg } from "../types/product/product.types";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetProductQuery(productId);
  console.log(data);
  const [quantity, setQuantity] = useState(1);
  const [selectedProductImg, setSelectedProductImg] = useState(
    data?.data?.productImagesLink[0]
  );
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
          {data?.data?.features.map((feature: object) => (
            <p>
              - {Object.keys(feature)[0]} : {Object.values(feature)[0]}
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
          {data?.data?.specifications.map((spec: object) => (
            <p>
              - {Object.keys(spec)[0]} : {Object.values(spec)[0]}
            </p>
          ))}
        </>
      ),
    },
    {
      key: "4",
      label: "Stock Quantity",
      children: (
        <p className="text-lg text-center">{data?.data?.stockQuantity}</p>
      ),
    },
  ];

  useEffect(() => {
    setSelectedProductImg(data?.data?.productImagesLink[0]);
  }, [data]);

  if (isLoading) {
    return <Spin fullscreen />;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 p-12">
      <div>
        <div className=" h-[500px] flex justify-center items-center mb-5">
          <Image className="rounded-lg " src={selectedProductImg?.url} />
        </div>
        <div className="flex justify-center items-center gap-4">
          {data.data.productImagesLink.map((productImg: TProductImg) => (
            <button onClick={() => setSelectedProductImg(productImg)}>
              <img
                className="w-[100px] h-[100px] hover:opacity-30 "
                src={productImg.url}
                alt=""
              />
            </button>
          ))}
        </div>
      </div>
      <div className="w-2/3 text-primary">
        <h3 className="text-4xl mb-3">{data?.data?.productName}</h3>
        <p>Category: {data?.data?.category?.categoryName}</p>
        <p className="text-tertiary text-3xl mt-4">$ {data?.data?.price}</p>
        <p className=" text-xl mt-5">
          <span className="text-cs-ash font-bold">By</span> {data?.data?.brand}
        </p>
        <div className="mt-3">
          <Rate disabled defaultValue={data?.data?.rating} />
        </div>
        <div className="flex gap-3 mt-10  ">
          <button
            className="border border-tertiary px-4 py-1 hover:bg-tertiary rounded text-center text-primary"
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          >
            -
          </button>
          <p className="border border-primary px-4 py-1 rounded text-center text-3xl text-primary">
            {quantity}
          </p>
          <button
            disabled={data?.data?.stockQuantity <= quantity}
            className="border border-tertiary px-4 py-1 hover:bg-tertiary rounded text-primary"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
          <CSButton
            onClick={() => {
              dispatch(addToCart({ product: data.data, quantity }));
              message.success("Added to cart!");
            }}
            styles="w-full py-3 hover:text-cs-bg rounded"
          >
            Add to Cart
          </CSButton>
        </div>
        <CSButton
          onClick={() => {
            dispatch(addToCart({ product: data.data, quantity }));
            message.success("Added to cart!");
          }}
          styles="w-full py-2 hover:text-cs-bg rounded mt-4"
        >
          <Link to="/checkout">Buy it now</Link>
        </CSButton>
        <CSCollapse items={items} defaultActiveKey={["1"]} />
      </div>
    </div>
  );
};

export default ProductDetail;

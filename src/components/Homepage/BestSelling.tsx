// const products = [
//   {
//     _id: crypto.randomUUID(),
//     categoryId: "01",
//     productName: "Sirac Plus Backpack",
//     brand: "Lowe Alpine",
//     price: 22400,
//     soldCount: 4,
//     isAvailable: true,
//     productImagesLink: [
//       {
//         altText: "Backpack",
//         url: "https://adventureshop.mt/cdn/shop/files/Sirac_Plus_ND50_Ebony_FMQ_52_EBN.jpg?v=1718724629&width=1225",
//       },
//     ],
//     description: "",
//     features: [],
//     specifications: [{}],
//     extraInfo: [{}],
//   },
//   {
//     _id: crypto.randomUUID(),
//     categoryId: "01",
//     productName: "Sirac Plus Backpack 1",
//     brand: "Lowe Alpine",
//     price: 22400,
//     soldCount: 4,
//     isAvailable: true,
//     productImagesLink: [
//       {
//         altText: "Backpack",
//         url: "https://adventureshop.mt/cdn/shop/files/2020301_1292_E460.jpg?v=1715590709&width=1500",
//       },
//     ],
//     description: "",
//     features: [],
//     specifications: [{}],
//     extraInfo: [{}],
//   },
//   {
//     _id: crypto.randomUUID(),
//     categoryId: "01",
//     productName: "Sirac Plus Backpack 2",
//     brand: "Lowe Alpine",
//     price: 22400,
//     soldCount: 4,
//     isAvailable: true,
//     productImagesLink: [
//       {
//         altText: "Backpack",
//         url: "https://adventureshop.mt/cdn/shop/files/2020301_1292_E460.jpg?v=1715590709&width=1500",
//       },
//     ],
//     description: "",
//     features: [],
//     specifications: [{}],
//     extraInfo: [{}],
//   },
//   {
//     _id: crypto.randomUUID(),
//     categoryId: "01",
//     productName: "Sirac Plus Backpack 2",
//     brand: "Lowe Alpine",
//     price: 22400,
//     soldCount: 4,
//     isAvailable: true,
//     productImagesLink: [
//       {
//         altText: "Backpack",
//         url: "https://adventureshop.mt/cdn/shop/files/2020301_1292_E460.jpg?v=1715590709&width=1500",
//       },
//     ],
//     description: "",
//     features: [],
//     specifications: [{}],
//     extraInfo: [{}],
//   },
// ];
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { useGetBestSellingProductsQuery } from "../../redux/features/products/productApi";
import { TProduct } from "../../types/product/product.types";
import ProductCard from "../ProductCard";
import SectionHeading from "./SectionHeading";

const BestSelling = () => {
  const { data, isLoading, isError } =
    useGetBestSellingProductsQuery(undefined);
  if (isError) {
    return <div className="text-center pt-10">Some Error Occurred!</div>;
  }

  return (
    <div className="pt-10 px-10 ">
      <SectionHeading styles="mb-10">Our Best Selling Items</SectionHeading>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spin />;
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center gap-6 sm:flex-row flex-col flex-wrap">
            {data?.data?.map((product: TProduct) => (
              <ProductCard product={product} imgHeight={250} imgWidth={200} />
            ))}
          </div>
          <Link
            to="/products"
            className="flex justify-center mt-5 hover:font-bold"
          >
            See More
          </Link>
        </>
      )}
    </div>
  );
};

export default BestSelling;

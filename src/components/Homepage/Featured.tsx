import { Spin } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGetFeaturedProductsQuery } from "../../redux/features/products/productApi";
import { TProduct } from "../../types/product/product.types";
import CSButton from "../common/CSButton";
import SectionHeading from "./SectionHeading";
const Featured = () => {
  const { data, isLoading } = useGetFeaturedProductsQuery(undefined, {
    pollingInterval: 10000,
    skipPollingIfUnfocused: true,
  });

  return (
    <div className="py-8 ">
      <SectionHeading styles="mb-6">Explore Featured Products</SectionHeading>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          {data?.data.map((product: TProduct) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative"
              key={product._id}
            >
              <img
                className="w-[300px] h-[400px] rounded "
                src={product.productImagesLink[0].url}
                alt={product.productImagesLink[0].altText}
              />
              <div className="absolute overflow-visible -bottom-4  z-50 w-full text-center">
                <Link
                  to={`/products/${product._id}`}
                  className="hover:text-cs-bg"
                >
                  <CSButton styles={` px-1 py-1 w-[80%]`}>See Details</CSButton>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Featured;

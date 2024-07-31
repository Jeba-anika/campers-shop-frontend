import { Spin } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGetFeaturedProductsQuery } from "../../redux/features/products/productApi";
import { TProduct } from "../../types/product/product.types";
import CSButton from "../common/CSButton";
const Featured = () => {
  const { data, isLoading } = useGetFeaturedProductsQuery(undefined, {
    pollingInterval: 10000,
    skipPollingIfUnfocused: true,
  });
  console.log(data);
  if (isLoading) {
    return <Spin fullscreen />;
  }
  return (
    // <div className="grid md:grid-cols-2 ">
    //   <div className="min-h-max">
    //     <img
    //       className="min-h-full max-w-full"
    //       src={FeaturedImg}
    //       alt="Featured"
    //     ></img>
    //   </div>
    //   <div className=" py-6">
    //     <h1 className="text-center mb-6 text-2xl text-highlight">
    //       Explore Featured Products
    //     </h1>
    //     <div className="grid grid-cols-2 justify-items-center content-center gap-10">
    //       {data?.data.map((product: TProduct) => (
    //         <motion.div
    //           whileHover={{ scale: 1.1 }}
    //           className="relative"
    //           key={product._id}
    //         >
    //           <img
    //             className="w-[300px] h-[300px] rounded"
    //             src={product.productImagesLink[0].url}
    //             alt={product.productImagesLink[0].altText}
    //           />
    //           <div className="absolute bottom-2 left-2 ">
    //             <CSButton styles={` px-1 py-1 `}>See Details</CSButton>
    //           </div>
    //         </motion.div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div className="py-8">
      <h1 className="text-center mb-6 text-2xl text-highlight">
        Explore Featured Products
      </h1>
      <div className="flex justify-center gap-8">
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
              <Link to={`/products/${product._id}`}>
                <CSButton styles={` px-1 py-1 w-[80%]`}>See Details</CSButton>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Featured;

import { Col, Row, Spin } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/features/categories/categoryApi";
import { TCategory } from "../../types/category/category.types";
import SectionHeading from "./SectionHeading";

const CategorySection = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery(undefined);

  return (
    <div className="pt-10">
      <SectionHeading styles="my-6"> Explore Popular Categories</SectionHeading>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        <div className="bg-tertiary m-10 rounded-xl py-8">
          <Row justify="center" align="middle">
            {categories?.data.map((category: TCategory) => (
              <Col
                key={category._id}
                className="gutter-row"
                xs={24}
                sm={12}
                md={12}
                lg={6}
                xl={6}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex justify-center items-center"
                >
                  <div>
                    <img
                      className="rounded-full w-[150px] h-[150px]"
                      src={category.image}
                    />
                    <Link
                      to={`/products?category=${category.categoryName}`}
                      className="text-center"
                    >
                      <div className="hover:underline my-4 text-primary font-bold">
                        {category.categoryName}
                      </div>
                    </Link>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default CategorySection;

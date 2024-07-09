import { Col, Row } from "antd";
import { motion } from "framer-motion";

const categories = [
  {
    _id: crypto.randomUUID(),
    categoryName: "Backpack",
    image:
      "https://adventureshop.mt/cdn/shop/files/2020301_1292_E460.jpg?v=1715590709&width=1500",
  },
  {
    _id: crypto.randomUUID(),
    categoryName: "Backpack",
    image:
      "https://adventureshop.mt/cdn/shop/files/2020301_1292_E460.jpg?v=1715590709&width=1500",
  },
  {
    _id: crypto.randomUUID(),
    categoryName: "Backpack",
    image:
      "https://adventureshop.mt/cdn/shop/files/2020301_1292_E460.jpg?v=1715590709&width=1500",
  },
  {
    _id: crypto.randomUUID(),
    categoryName: "Backpack",
    image:
      "https://adventureshop.mt/cdn/shop/files/2020301_1292_E460.jpg?v=1715590709&width=1500",
  },
];

const CategorySection = () => {
  return (
    <div className="py-10">
      <h1 className="text-center my-6 text-2xl text-highlight">
        Explore Popular Categories
      </h1>
      <div className="bg-tertiary m-10 rounded-xl py-14">
        <Row justify="center" align="middle" gutter={24}>
          {categories.map((category) => (
            <Col
              key={category._id}
              className="gutter-row"
              xs={24}
              sm={12}
              md={12}
              lg={6}
              xl={6}
            >
              {/* <motion.div
              whileHover={{ scale: 1.1 }}
              style={{
                backgroundImage: `url(${category.image})`,
                height: "250px",
                backgroundSize: "cover",
                width: "250px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="flex items-end rounded-ss-2xl rounded-br-2xl"
            >
              <div className="p-8">
                <h3 className="text-3xl">{category.categoryName}</h3>
                <Button>Shop Now</Button>
              </div>
            </motion.div> */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex justify-center items-center"
              >
                <div>
                  <img
                    className="rounded-full w-[150px] h-[150px]"
                    src={category.image}
                  />
                  <h2 className="text-center hover:underline my-4">
                    {category.categoryName}
                  </h2>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default CategorySection;

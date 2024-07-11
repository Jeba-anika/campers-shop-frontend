const products = [
  {
    _id: crypto.randomUUID(),
    categoryId: "01",
    productName: "Sirac Plus Backpack",
    brand: "Lowe Alpine",
    price: 22400,
    soldCount: 4,
    isAvailable: true,
    productImagesLink: [
      {
        altText: "Backpack",
        url: "https://adventureshop.mt/cdn/shop/files/Sirac_Plus_ND50_Ebony_FMQ_52_EBN.jpg?v=1718724629&width=1225",
      },
    ],
    description: "",
    features: [],
    specifications: [{}],
    extraInfo: [{}],
  },
  {
    _id: crypto.randomUUID(),
    categoryId: "01",
    productName: "Sirac Plus Backpack 1",
    brand: "Lowe Alpine",
    price: 22400,
    soldCount: 4,
    isAvailable: true,
    productImagesLink: [
      {
        altText: "Backpack",
        url: "https://adventureshop.mt/cdn/shop/files/2020301_1292_E460.jpg?v=1715590709&width=1500",
      },
    ],
    description: "",
    features: [],
    specifications: [{}],
    extraInfo: [{}],
  },
  {
    _id: crypto.randomUUID(),
    categoryId: "01",
    productName: "Sirac Plus Backpack 2",
    brand: "Lowe Alpine",
    price: 22400,
    soldCount: 4,
    isAvailable: true,
    productImagesLink: [
      {
        altText: "Backpack",
        url: "https://adventureshop.mt/cdn/shop/files/2020301_1292_E460.jpg?v=1715590709&width=1500",
      },
    ],
    description: "",
    features: [],
    specifications: [{}],
    extraInfo: [{}],
  },
  {
    _id: crypto.randomUUID(),
    categoryId: "01",
    productName: "Sirac Plus Backpack 2",
    brand: "Lowe Alpine",
    price: 22400,
    soldCount: 4,
    isAvailable: true,
    productImagesLink: [
      {
        altText: "Backpack",
        url: "https://adventureshop.mt/cdn/shop/files/2020301_1292_E460.jpg?v=1715590709&width=1500",
      },
    ],
    description: "",
    features: [],
    specifications: [{}],
    extraInfo: [{}],
  },
];
import { Button, Col, Row } from "antd";
import ProductCard from "../ProductCard";

const BestSelling = () => {
  return (
    <div className="py-10 px-4 bg-secondary">
      <h1 className="text-center my-4 text-2xl">Our Best Selling Items</h1>
      <Row justify="center" align="middle" gutter={24}>
        {products.map((product) => (
          <Col
            key={product._id}
            className="gutter-row"
            xs={24}
            sm={12}
            md={12}
            lg={6}
            xl={6}
          >
            <ProductCard imgHeight={300} imgWidth={200} product={product} />
          </Col>
        ))}
      </Row>
      <div className="flex justify-center my-5">
        <Button>See More</Button>
      </div>
    </div>
  );
};

export default BestSelling;

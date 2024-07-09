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
];
import { Button, Card, Col, Row } from "antd";

const { Meta } = Card;

const BestSelling = () => {
  return (
    <div className="py-10 px-4 bg-secondary">
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
            <Card
              hoverable
              //style={{ width: 240 }}
              cover={
                <img alt="example" src={product.productImagesLink[0].url} />
              }
            >
              <Meta
                title={product.productName}
                description={`$${product.price}`}
              />
              <div className="my-4">
                <Button>See Details</Button>
              </div>
            </Card>
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

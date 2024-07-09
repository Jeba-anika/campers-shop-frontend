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
import FeaturedImg from "../../assets/featured_section.png";
const Featured = () => {
  return (
    <div className="grid md:grid-cols-2 ">
      <div className="min-h-max">
        <img
          className="min-h-full max-w-full"
          src={FeaturedImg}
          alt="Featured"
        ></img>
      </div>
      <div className="bg-cs-ash py-6">
        <h1 className="text-center mb-6 text-2xl text-highlight">
          Explore Featured Products
        </h1>
        <div className="grid grid-cols-2 justify-items-center content-center gap-10">
          {products.map((product) => (
            <div>
              <img
                className="w-[200px] h-[200px]"
                src={product.productImagesLink[0].url}
                alt={product.productImagesLink[0].altText}
              />
              <h2>{product.productName}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;

import { Card, Rate } from "antd";
import { Link } from "react-router-dom";
import { TProduct } from "../types/product/product.types";
import CSButton from "./common/CSButton";

const { Meta } = Card;
const ProductCard = ({
  product,
  imgHeight,
  imgWidth,
}: {
  product: TProduct;
  imgHeight: number;
  imgWidth: number;
}) => {
  return (
    <Card
      hoverable
      cover={
        <img
          style={{ height: `${imgHeight}px`, minWidth: `${imgWidth}px` }}
          alt={product?.productImagesLink[0].altText}
          src={product?.productImagesLink[0].url}
        />
      }
    >
      <Meta title={product?.productName} />
      <div className="my-3">
        <p className="text-primary text-xl mb-3">${product?.price}</p>
        <div className="mb-3">
          <Rate disabled defaultValue={product?.rating} />
        </div>
        <Link
          className="text-primary hover:text-cs-bg"
          to={`/products/${product?._id}`}
        >
          <CSButton styles="px-3 py-2 rounded-full w-full">
            See Details
          </CSButton>
        </Link>
      </div>
    </Card>
  );
};

export default ProductCard;

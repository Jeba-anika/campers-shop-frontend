import { Button, Card, Image } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;
const ProductCard = ({
  product,
  imgHeight,
  imgWidth,
}: {
  product: object;
  imgHeight: number;
  imgWidth: number;
}) => {
  return (
    <Card
      hoverable
      className="min-h-max"
      cover={
        <Image
          className={`min-h-[${imgHeight}px] w-[${imgWidth}px]`}
          alt={product?.productImagesLink[0].altText}
          src={product?.productImagesLink[0].url}
        />
      }
    >
      <Meta title={product?.productName} description={`$${product.price}`} />
      <div className="my-4">
        <Link to={`/products/${product?._id}`}>
          <Button>See Details</Button>
        </Link>
      </div>
    </Card>
  );
};

export default ProductCard;

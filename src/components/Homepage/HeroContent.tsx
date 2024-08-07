import { Link } from "react-router-dom";
const HeroContent = ({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) => {
  return (
    <div className="flex justify-center items-center flex-col gap-4 bg-opacity-30 bg-cs-bg p-10 h-full">
      <h1 className="text-3xl  sm:text-5xl text-primary text-center">
        {heading}
      </h1>
      <p className="text-xl sm:text-2xl text-center text-primary">
        {description}
      </p>
      <Link
        to="/products"
        className="border hover:border-cs-bg font-bold text-cs-bg  text-xl  px-5 py-4 border-primary bg-primary hover:text-cs-bg rounded-lg"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default HeroContent;

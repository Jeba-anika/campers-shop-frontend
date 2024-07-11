import { Carousel } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Banner2 from "../../assets/banner-2.png";
import Banner3 from "../../assets/banner-3.png";
import Banner4 from "../../assets/banner-4.png";
const Hero = () => {
  const backgroundStyle = (url: string) => {
    return {
      backgroundImage: `url(${url})`,
      height: "600px",
      backgroundSize: "cover",
      width: "100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  };
  return (
    <Carousel autoplay effect="fade">
      <div>
        <div style={{ ...backgroundStyle(Banner2) }}>
          <motion.div
            transition={{
              ease: "backInOut",
              duration: 2,
              delayChildren: 0.5,
            }}
            animate={{ y: 100 }}
            className="text-center"
          >
            <h1 className="  text-5xl text-highlight">Camping</h1>
            <p className="text-2xl my-9 text-white md:text-highlight">
              Create your dream campsite with our camping essentials. Under the
              stars, every night is an adventure waiting to unfold.
            </p>
            <Link
              to="/products"
              className="border border-neutral text-neutral sm:border-highlight text-xl sm:text-highlight px-5 py-4 hover:border-highlight hover:bg-tertiary hover:text-highlight rounded-lg"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>
      <div>
        <div style={backgroundStyle(Banner3)}>
          <motion.div className="text-start pt-10 px-10 text-highlight">
            <h3 className="text-5xl">STABLE | VERSATILE | EASY TO PITCH</h3>
            <p className="text-2xl my-7">
              Classic Air 300 Vango's Most Sturdiest AirBeam®
            </p>
            <p>
              Inflatable Tent SHOP NOW MAKE YOUR NEXT CAMPING TRIP STRESS FREE.
              Classic Instant 300 Easy to Pop Up & Simple to Take Down
            </p>
          </motion.div>
        </div>
      </div>
      <div>
        <div style={backgroundStyle(Banner4)}>
          <div className="text-start pt-10 px-10">
            <h3 className="text-5xl sm:text-5xl text-neutral sm:text-highlight">
              Gear Up for the Great Outdoors
            </h3>
            <p className="text-2xl my-7 text-neutral sm:text-highlight">
              Quality camping equipment for all your wilderness needs.
            </p>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Hero;

import { Button, Carousel } from "antd";
import { motion } from "framer-motion";
import Banner1 from "../../assets/banner-1.png";
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
        <div style={{ ...backgroundStyle(Banner1), color: "white" }}>
          <motion.div
            transition={{
              ease: "backInOut",
              duration: 2,
              delayChildren: 0.5,
            }}
            animate={{ y: 250 }}
            className="text-center"
          >
            <h1 className="  text-5xl ">Camping</h1>
            <p className="text-2xl my-7">
              Create your dream campsite with our camping essentials. Under the
              stars, every night is an adventure waiting to unfold.
            </p>
            <Button>See Products</Button>
          </motion.div>
        </div>
      </div>
      <div>
        <div style={backgroundStyle(Banner2)}>
          <motion.div className="text-center">
            <h3>STABLE | VERSATILE | EASY TO PITCH</h3>
            <p>
              Classic Air 300 Vango's Most Sturdiest AirBeam® Inflatable Tent
              SHOP NOW MAKE YOUR NEXT CAMPING TRIP STRESS FREE
            </p>
            <p>Classic Instant 300 Easy to Pop Up & Simple to Take Down</p>
          </motion.div>
        </div>
      </div>
      <div>
        <div style={backgroundStyle(Banner3)}>
          <h3>2</h3>
        </div>
      </div>
      <div>
        <div style={backgroundStyle(Banner4)}>
          <h3>2</h3>
        </div>
      </div>
    </Carousel>
  );
};

export default Hero;

import { Carousel } from "antd";
import Banner2 from "../../assets/banner-2.png";
import Banner3 from "../../assets/banner-3.png";
import Banner4 from "../../assets/banner-4.png";
import HeroContent from "./HeroContent";
const Hero = () => {
  const backgroundStyle = (url: string) => {
    return {
      backgroundImage: `url(${url})`,
      height: "500px",
      backgroundSize: "cover",
      width: "100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  };
  return (
    <Carousel autoplay effect="fade" arrows>
      <div>
        <div style={{ ...backgroundStyle(Banner2) }}>
          <HeroContent
            heading={"Camping"}
            description={
              "Create your dream campsite with our camping essentials. Under the stars, every night is an adventure waiting to unfold."
            }
          />
        </div>
      </div>
      <div>
        <div style={backgroundStyle(Banner3)}>
          <HeroContent
            heading="STABLE | VERSATILE | EASY TO PITCH"
            description="Classic Air 300 Vango's Most Sturdiest AirBeam®"
          />
        </div>
      </div>
      <div>
        <div style={backgroundStyle(Banner4)}>
          <HeroContent
            heading="Gear Up for the Great Outdoors"
            description="Quality camping equipment for all your wilderness needs."
          />
        </div>
      </div>
    </Carousel>
  );
};

export default Hero;

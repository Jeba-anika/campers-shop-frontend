import BestSelling from "../components/Homepage/BestSelling";
import CategorySection from "../components/Homepage/CategorySection";
import Featured from "../components/Homepage/Featured";
import Hero from "../components/Homepage/Hero";
import Navbar from "../components/Homepage/Navbar";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <BestSelling />
      <CategorySection />
      <Featured />
    </div>
  );
};

export default Homepage;

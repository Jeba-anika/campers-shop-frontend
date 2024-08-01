import BestSelling from "../components/Homepage/BestSelling";
import CategorySection from "../components/Homepage/CategorySection";
import CSValues from "../components/Homepage/CSValues";
import Featured from "../components/Homepage/Featured";
import Hero from "../components/Homepage/Hero";

const Homepage = () => {
  return (
    <div>
      <Hero />
      <BestSelling />
      <CategorySection />
      <CSValues />
      <Featured />
    </div>
  );
};

export default Homepage;

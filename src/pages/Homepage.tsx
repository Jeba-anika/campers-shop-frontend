import BestSelling from "../components/Homepage/BestSelling";
import CategorySection from "../components/Homepage/CSCategorySection";

import CSValues from "../components/Homepage/CSValues";
import Featured from "../components/Homepage/Featured";
import Hero from "../components/Homepage/Hero";
import CSFaq from "./../components/Homepage/CSFaq";

const Homepage = () => {
  return (
    <div>
      <Hero />
      <BestSelling />
      <CategorySection />
      <CSValues />
      <Featured />
      <CSFaq />
    </div>
  );
};

export default Homepage;

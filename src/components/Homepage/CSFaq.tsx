import { CollapseProps } from "antd";
import CSCollapse from "../common/CSCollapse";
import SectionHeading from "./SectionHeading";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "What types of camping gear do you offer?",
    children: (
      <p className="text-primary">
        We offer a wide range of camping gear, including tents, sleeping bags,
        backpacks, cooking equipment, and outdoor apparel. Our products are
        designed to meet the needs of campers of all levels, from beginners to
        experienced adventurers.
      </p>
    ),
  },
  {
    key: "2",
    label: "How do I know which product is right for me?",
    children: (
      <p>
        Each product on our website includes detailed descriptions,
        specifications, and customer reviews to help you make an informed
        decision. If you need further assistance, our customer service team is
        always ready to help you choose the best gear for your needs.
      </p>
    ),
  },
  {
    key: "3",
    label: "What are your shipping options?",
    children: (
      <p>
        We offer standard, expedited, and express shipping options. Shipping
        times and costs vary based on your location and the selected shipping
        method. Detailed shipping information is provided at checkout.
      </p>
    ),
  },
  {
    key: "4",
    label: "What is your return policy?",
    children: (
      <p>
        We offer a 30-day return policy on most items. If you are not satisfied
        with your purchase, you can return it for a refund or exchange. Please
        ensure that the items are in their original condition and packaging.
      </p>
    ),
  },
  {
    key: "5",
    label: "How can I contact customer service?",
    children: (
      <p>
        You can contact our customer service team via email at
        support@campersshop.com or by phone at 1-800-123-4567. Our team is
        available Monday to Friday from 9 AM to 5 PM (PST).
      </p>
    ),
  },
];
const CSFaq = () => {
  return (
    <div className="py-10 flex flex-col sm:flex-row justify-center items-center gap-10">
      <SectionHeading>FAQ___?</SectionHeading>
      <CSCollapse items={items} styles="sm:w-1/2 w-[80%]" />
    </div>
  );
};

export default CSFaq;

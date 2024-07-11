import type { CollapseProps } from "antd";
import { Avatar, Collapse, List } from "antd";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const About = () => {
  const data = [
    {
      name: " Jane Doe",
      designation: "Founder & CEO",
      description:
        "Jane is an avid camper with over 20 years of experience in the outdoor industry. She founded CamperShop to share her passion for the great outdoors.",
    },
    {
      name: " John Smith",
      designation: "Marketing Director",
      description:
        "John leads our product development team, ensuring that every item we offer meets the highest standards of quality and innovation.",
    },
    {
      name: "Emily Johnson",
      designation: "Head of Product Development",
      description:
        "Emily is responsible for spreading the word about CamperShop and connecting with our community of outdoor enthusiasts.",
    },
  ];
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Our Mission",
      children: (
        <p>
          At Campers Shop, our mission is to provide high-quality camping gear
          that enhances your outdoor adventures. We value sustainability,
          durability, and customer satisfaction. Our goal is to equip you with
          the best products for a safe and enjoyable camping experience.
        </p>
      ),
    },
    {
      key: "2",
      label: "Contact Information",
      children: (
        <section>
          <h2>Contact Information</h2>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Email: info@campershop.com</p>
          <p>Address: 123 Camping Lane, Adventure City, CA 94102</p>
        </section>
      ),
    },
    {
      key: "3",
      label: "Location ",
      children: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.6291073724246!2d90.3625853747934!3d23.796218287016856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1312ef98dd9%3A0x39ea4564dc5407e7!2sBarek%20Mollar%20Mor!5e0!3m2!1sen!2sbd!4v1720717310563!5m2!1sen!2sbd"
          width="600"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
      ),
    },
    {
      key: "4",
      label: "Follow us ",
      children: (
        <div className="flex justify-center gap-3">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={32} />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={32} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={32} />
          </a>
        </div>
      ),
    },
    {
      key: "5",
      label: "Team Members",
      children: (
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.designation}
              />
              <p className="text-start">{item.description}</p>
            </List.Item>
          )}
        />
      ),
    },
  ];
  return (
    <div className="py-10 px-10 sm:px-20">
      <h2 className="text-center font-bold text-3xl mb-10 text-highlight">
        About us
      </h2>
      <Collapse
        className="mt-10 bg-tertiary border border-tertiary"
        items={items}
        defaultActiveKey={["1"]}
        //onChange={onChange}
      />
    </div>
  );
};

export default About;

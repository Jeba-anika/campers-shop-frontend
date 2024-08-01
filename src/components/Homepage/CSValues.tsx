import SectionHeading from "./SectionHeading";

const values = [
  {
    title: "Integrity at Campers Shop",
    description:
      "At Campers Shop, integrity is at the heart of everything we do. We believe in being honest, transparent, and ethical to build trust with our customers. We hold ourselves to high standards and take responsibility for our actions. By doing this, we offer top-quality products and services, fostering lasting relationships. Integrity guides our decisions and shows our commitment to excellence in every interaction. It’s more than just a value; it’s our guide to achieving long-term success and earning the respect of our community.",
    color: "#BBACAF",
  },
  {
    title: "Customer Focus",
    description:
      "Our customers are at the heart of everything we do. We prioritize understanding their needs and providing exceptional service. Every decision we make is centered around delivering a positive and satisfying experience for our customers, ensuring their outdoor adventures are memorable and enjoyable.",

    color: "#977F6D",
  },
  {
    title: "Quality & Sustainability",
    description:
      "We are dedicated to offering only the best products. Quality is paramount at Campers Shop, and we ensure that our gear is reliable, durable, and capable of withstanding the rigors of the great outdoors. Our customers can trust that they are getting top-notch products every time. Protecting the environment is a key value for us. We are committed to sustainable practices and eco-friendly products that help preserve nature for future generations. Our efforts ensure that the beauty of the outdoors remains intact for everyone to enjoy.",

    color: "#C2491D",
  },
  {
    title: "Innovation",
    description:
      "At Campers Shop, we embrace innovation. We continually seek new ideas and technologies to improve our products and services. By staying at the forefront of advancements in camping gear, we offer our customers the latest and greatest options for their adventures.",

    color: "#B62429",
  },
];

const CSValues = () => {
  return (
    <div className="bg-cs-bg py-10">
      <SectionHeading>Our Values</SectionHeading>
      {values.map((value, index) => {
        return (
          <>
            <div className="h-screen flex items-center justify-center sticky top-0">
              <div
                style={{
                  backgroundColor: value.color,
                  width: `calc(${700 + index * 25}px)`,
                  height: "400px",
                  borderRadius: "25px",
                  position: "relative",
                  top: `calc(-5vh + ${index * 50}px)`,
                }}
              >
                <div className="flex flex-col items-center justify-center px-14 pt-2 ">
                  <h2 className="text-center font-bold text-2xl mb-10">
                    {value.title}
                  </h2>
                  <div>
                    <div>
                      <p className="text-justify">{value.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
export default CSValues;

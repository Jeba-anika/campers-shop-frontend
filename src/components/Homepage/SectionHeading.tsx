import { ReactNode } from "react";

const SectionHeading = ({
  children,
  styles,
}: {
  children: ReactNode;
  styles?: string;
}) => {
  return (
    <h1 className={`text-center  text-2xl text-primary font-bold ${styles}`}>
      {children}
    </h1>
  );
};

export default SectionHeading;

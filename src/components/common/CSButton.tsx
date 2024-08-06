import React, { ReactNode } from "react";

const CSButton = ({
  children,
  styles,
  type = undefined,
  onClick,
}: {
  children: ReactNode;
  styles: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-cs-bg border border-primary hover:bg-primary  hover:border hover:border-primary hover:bg-none  ${styles}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default CSButton;

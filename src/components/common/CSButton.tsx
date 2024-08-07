import { Spin } from "antd";
import React, { ReactNode } from "react";

const CSButton = ({
  children,
  styles,
  type = undefined,
  onClick,
  isLoading = false,
}: {
  children: ReactNode;
  styles: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLElement>;
  isLoading?: boolean;
}) => {
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className={`bg-cs-bg border border-primary hover:bg-primary  hover:border hover:border-primary hover:bg-none disabled:opacity-60  ${styles}`}
      type={type}
    >
      <div className="flex justify-center items-center gap-3">
        {isLoading && <Spin className="" />}
        {children}
      </div>
    </button>
  );
};

export default CSButton;

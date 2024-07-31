import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import { Badge } from "antd";
import { useAppSelector } from "../redux/hooks";
const Navbar = () => {
  const { cart } = useAppSelector((state) => state.cart);
  return (
    <div className="flex sm:flex-row flex-col justify-around items-center h-[100px] sm:h-[70px] bg-[#F1F8E8]">
      <Link to="/" className="flex gap-3 justify-center items-center">
        <img
          className="size-12 rounded-full"
          src={logo}
          alt="campers-shop-logo"
        ></img>
        <h1 className="font-bold text-2xl text-primary">Campers Shop</h1>
      </Link>
      <div className="flex gap-3 text-primary items-center">
        <Link className=" hover:font-bold hover:rounded p-2" to="/products">
          Products
        </Link>
        <Link
          className=" hover:font-bold hover:rounded p-2"
          to="/product-management"
        >
          Manage Products
        </Link>
        <Link className=" hover:font-bold hover:rounded p-2" to="/about">
          About Us
        </Link>
        <Link to="/cart">
          <Badge count={cart?.length} showZero>
            <ShoppingCartOutlined className="text-2xl text-primary" />
          </Badge>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Navbar = () => {
  return (
    <div className="flex sm:flex-row flex-col justify-around items-center h-[100px] sm:h-[80px] bg-neutral">
      <Link to="/" className="flex gap-3 justify-center items-center">
        <img
          className="size-12 rounded-full"
          src={logo}
          alt="campers-shop-logo"
        ></img>
        <h1 className="font-bold text-3xl text-highlight">Campers Shop</h1>
      </Link>
      <div className="flex gap-3 text-highlight">
        <Link
          className="hover:border hover:border-highlight hover:rounded p-2"
          to="/products"
        >
          Products
        </Link>
        <Link
          className="hover:border hover:border-highlight hover:rounded p-2"
          to="/product-management"
        >
          Manage Products
        </Link>
        <Link
          className="hover:border hover:border-highlight hover:rounded p-2"
          to="/about"
        >
          About Us
        </Link>
        <Link
          className="hover:border hover:border-highlight hover:rounded p-2"
          to="/"
        >
          About Us
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

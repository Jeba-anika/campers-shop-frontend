import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Navbar = () => {
  return (
    <div className="flex justify-around items-center">
      <div className="flex gap-3 justify-center items-center">
        <img
          className="size-12 rounded-full"
          src={logo}
          alt="campers-shop-logo"
        ></img>
        <h1 className="font-bold text-xl">Campers Shop</h1>
      </div>
      <div>
        <Link to="/about">About Us</Link>
        <Link to="/about">About Us</Link>
        <Link to="/about">About Us</Link>
      </div>
    </div>
  );
};

export default Navbar;

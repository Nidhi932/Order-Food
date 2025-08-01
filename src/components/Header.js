import { LOGO_URL } from "../utils/constants";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Cart from "./Cart";

const Header = () => {
  const [btnname, setbtnname] = useState("Login");
  const [showCart, setShowCart] = useState(false);
  const { getCartCount, getCartTotal } = useCart();
  const cartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    if (showCart) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCart]);

  const Logo = () => {
    return (
      <a className="logo">
        <img src={LOGO_URL} alt="logo" />
      </a>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price / 100);
  };

  return (
    <div className="header">
      <div>
        <Logo />
      </div>
      <nav className="nav-items">
        <ul>
          <li className="home">
            <Link to="/">Home</Link>
          </li>
          <li className="about">
            <Link to="/">About Us</Link>
          </li>
          <li className="contact">
            <Link to="/">Contact Us</Link>
          </li>
          <li ref={cartRef}>
            <div className="go-btn" onClick={() => setShowCart(!showCart)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#fff"
                height="24px"
                className="size-6"
                style={{ transform: "scaleX(-1)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>{" "}
              Cart
            </div>
            {showCart && <Cart />}
          </li>
          <li>
            <button
              className={`${btnname === "Login" ? "login-btn" : "logout-btn"}`}
              onClick={() => {
                setbtnname(btnname === "Login" ? "Logout" : "Login");
              }}
            >
              {btnname}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;

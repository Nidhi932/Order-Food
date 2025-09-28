import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Cart from "./Cart";

const Header = () => {
  const [btnname, setbtnname] = useState("Login");
  const [showCart, setShowCart] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const Logo = () => {
    return (
      <Link to="/" className="logo">
        <img
          src="https://ik.imagekit.io/alsq7a3ki/Logo.png?updatedAt=1756066692261"
          alt="logo"
        />
      </Link>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price / 100);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
    if (window.innerWidth <= 768) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="header">
      <div className="header-left">
        <Logo />
      </div>

      {/* Hamburger Menu Button - Only visible on mobile */}
      <button
        className="hamburger-menu"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <span
          className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
        ></span>
        <span
          className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
        ></span>
        <span
          className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
        ></span>
      </button>

      {/* Navigation */}
      <nav
        className={`nav-items ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}
      >
        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
        )}

        <ul className="nav-list">
          <li className="home">
            <Link to="/" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="about">
            <Link to="/" onClick={closeMobileMenu}>
              About Us
            </Link>
          </li>
          <li className="contact">
            <Link to="/" onClick={closeMobileMenu}>
              Contact Us
            </Link>
          </li>
          <li ref={cartRef}>
            <div className="go-btn" onClick={handleCartClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#fff"
                height="24px"
                className="cart-icon"
                style={{ transform: "scaleX(-1)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <span>Cart</span>
              {getCartCount() > 0 && (
                <span className="cart-badge">{getCartCount()}</span>
              )}
            </div>
            {showCart && <Cart />}
          </li>
          <li className="auth-item">
            <button
              className={`${btnname === "Login" ? "login-btn" : "logout-btn"}`}
              onClick={() => {
                setbtnname(btnname === "Login" ? "Logout" : "Login");
                closeMobileMenu();
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

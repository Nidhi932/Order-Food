import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useCart } from "../context/CartContext";
import Notification from "./Notification";

const RestaurantsMenu = () => {
  const [menuList, setMenuList] = useState([]);
  const [notification, setNotification] = useState(null);
  const { resid } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      "https://foodfire.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=" +
        resid
    );
    const json = await data.json();
    const obj1 = json?.data;
    console.log(obj1);
    setMenuList(obj1);
  };

  const handleAddToCart = (item) => {
    addToCart({
      id: item.card.info.id,
      name: item.card.info.name,
      price: item.card.info.price || item.card.info.defaultPrice,
      imageId: item.card.info.imageId,
      description: item.card.info.description,
    });

    setNotification({
      message: `${item.card.info.name} added to cart!`,
      type: "success",
    });
  };

  if (!menuList?.cards || menuList.cards.length < 3) {
    return (
      <div className="menu-loading">
        <div className="loading-spinner"></div>
        <h2>Loading menu...</h2>
      </div>
    );
  }

  const { text } = menuList?.cards[0]?.card?.card;
  const { cuisines, avgRating, id } = menuList?.cards[2]?.card?.card?.info;
  const { itemCards } =
    menuList?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.find(
      (x) =>
        x?.card?.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ).card?.card;

  console.log(itemCards);

  return (
    <div className="restaurant-menu">
      <div className="restaurant-header">
        <div className="restaurant-info">
          <h1 className="restaurant-name">{text}</h1>
          <div className="restaurant-meta">
            <span className="rating">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                width="14"
                height="14"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
              </svg>{" "}
              {avgRating}
            </span>
            <span className="cuisines">{cuisines.join(", ")}</span>
          </div>
        </div>
      </div>

      <div className="menu-section">
        <h2 className="menu-title">🍽️ Menu</h2>
        <div className="menu-items">
          {itemCards?.map((item) => (
            <div key={item?.card?.info?.id} className="menu-item">
              <div className="menu-item-content">
                <div className="menu-item-info">
                  <h3 className="item-name">{item?.card?.info?.name}</h3>
                  <p className="item-description">
                    {item?.card?.info?.description || "Delicious food item"}
                  </p>
                  <div className="item-price">
                    ₹
                    {item?.card?.info?.price
                      ? (item?.card?.info?.price / 100).toFixed(2)
                      : item?.card?.info?.defaultPrice
                      ? (item?.card?.info?.defaultPrice / 100).toFixed(2)
                      : "0.00"}
                  </div>
                </div>
                <div className="menu-item-image">
                  <img
                    src={
                      item?.card?.info?.imageId
                        ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.card?.info?.imageId}`
                        : "https://via.placeholder.com/120x120?text=Food"
                    }
                    alt={item?.card?.info?.name}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/120x120?text=Food";
                    }}
                  />
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 12h14m-7 7V5"
                      />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default RestaurantsMenu;

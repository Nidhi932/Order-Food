import Rescards from "./Rescards.js";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer.js";
import { Link } from "react-router-dom";
import { RESTAURANT_TYPE_KEY } from "../utils/constants.js";

const Body = () => {
  const [List, setList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const data = await fetch(
      "https://foodfire.onrender.com/api/restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING"
      // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.9581934&lng=72.8320729&collection=83637&tags=layout_CCS_Burger&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
    );
    const json = await data.json();

    const obj =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    const filtered_list = obj
      .filter((x) => x["@type"] === RESTAURANT_TYPE_KEY)
      ?.map((x) => x?.info);
    console.log(obj);
    // setList(obj);
    // setFilteredList(obj);

    // const obj =
    //   json?.data?.cards
    //     ?.map((x) => x.card)
    //     ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY) || null;

    setList(filtered_list);
    setFilteredList(filtered_list);
    console.log(filtered_list);
  };
  const handleSearch = () => {
    const searchedList = List.filter((res) =>
      res.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredList(searchedList);
  };
  const topRated = () => {
    const filtered = List.filter((res) => res.avgRating > 4.2);
    setFilteredList(filtered);
  };
  if (List.length === 0) {
    return <Shimmer />;
  } else
    return (
      <>
        <div className="body">
          <div className="search-box">
            <div className="search-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Search here"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="26px"
                height="26px"
                fill="#6B7280"
              >
                <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
              </svg>
            </div>

            <button className="filter-btn" onClick={topRated}>
              Top Rated
            </button>
          </div>

          <div className="res-container">
            {filteredList.map((e) => (
              <Link key={e?.id} to={"restaurants/" + e?.id}>
                <Rescards resdata={e} />
              </Link>
            ))}
          </div>
        </div>
      </>
    );
};
export default Body;

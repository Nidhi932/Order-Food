import { IMG_URL } from "../utils/constants";

const Rescards = (props) => {
  const { resdata } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } = resdata;
  const { slaString } = resdata.sla;
  const match = costForTwo.match(/₹[\d,]+/);
  const cost = match ? match[0].replace(/,/g, "") : null;
  return (
    <div className="cards">
      <img src={IMG_URL + cloudinaryImageId} alt="restcard"></img>
      <div className="res-header">
        <h3 className="">{name}</h3>
        <p>
          {avgRating ?? 4.1}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            width="14"
            height="14"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
          </svg>
        </p>
      </div>
      <h4>{cuisines.join(", ")}</h4>
      <div className="price-sec">
        <div className="timing">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#666"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M13 7h6l2 4m-8-4v8H9m4-8V6c0-.26522-.1054-.51957-.2929-.70711C12.5196 5.10536 12.2652 5 12 5H4c-.26522 0-.51957.10536-.70711.29289C3.10536 5.48043 3 5.73478 3 6v9h2m14 0h2v-4m0 0h-5M8 8.66669V10l1.5 1.5m10 5c0 1.3807-1.1193 2.5-2.5 2.5s-2.5-1.1193-2.5-2.5S15.6193 14 17 14s2.5 1.1193 2.5 2.5Zm-10 0C9.5 17.8807 8.38071 19 7 19s-2.5-1.1193-2.5-2.5S5.61929 14 7 14s2.5 1.1193 2.5 2.5Z"
            />
          </svg>
          <h4>{slaString}</h4>
        </div>
        .<h3>{cost ?? "₹200"}</h3>
      </div>
    </div>
  );
};
export default Rescards;

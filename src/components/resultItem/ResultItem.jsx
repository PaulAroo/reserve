import React from "react";
import { useNavigate } from "react-router-dom";
import "./resultItem.scss";

function ResultItem({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hotels/${item._id}`);
  };
  return (
    <div className="result__item">
      <div className="image">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/square200/372396011.webp?k=5a31e30471b770b26272d72f05559989b4f5d24e4223436b80b28322aadf039f&o=&s=1"
          alt=""
        />
      </div>
      <div className="desc">
        <h1>{item.name}</h1>
        <p className="area">{item.distance}</p>
        <strong>Studio apartment with Air Conditioning</strong>
        <p>1 bathroom • 21m² 1 full bed</p>
      </div>
      <div className="details">
        {item.rating && (
          <div className="review">
            Very good <span>8.9</span>
          </div>
        )}
        <span className="price">{item.cheapestPrice}</span>
        <p>including taxes and fees</p>
        <button onClick={handleClick}>See Availabilty</button>
      </div>
    </div>
  );
}

export default ResultItem;

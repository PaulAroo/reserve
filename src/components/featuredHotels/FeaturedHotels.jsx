import React, { useState } from "react";
import { useEffect } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import useFetch from "../../customHooks/useFetch";
import "./featuredHotels.scss";

const photos = [
  "https://cf.bstatic.com/xdata/images/hotel/max500/74529578.jpg?k=a7fcefd47d7271daf44f6ce78a215b9505f9f8e5cac3af093b78b9c489fd8461&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max500/32087571.jpg?k=3724cb7f37e0e34e60b01cea07c4659a897885c9819728c67b1cec5544dd2b24&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max500/77765526.jpg?k=af77ae28b7b1118e4982d1d4c72ec3b370e171ac653d2aec569a75db55669445&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max500/102743522.jpg?k=ec1674f7d6baa425ce4d27fcde9327376b0e5d36b7972a12a82285f53761aa68&o=",
];

function FeaturedHotels() {
  const { data, error, loading } = useFetch("/hotels?featured=true");

  const slider = document.querySelector(".f_slider");

  const handleScroll = (direction) => {
    if (direction === "L") slider.scrollLeft -= 500;
    else if (direction === "R") slider.scrollLeft += 500;
  };

  return (
    <div className="featured_hotels">
      <div className="f_left">
        <BsArrowLeftCircle
          className="f_arrow"
          onClick={() => handleScroll("L")}
        />
      </div>
      <div className="f_slider">
        {loading ? (
          <div>loading</div>
        ) : (
          data.map((item, index) => (
            <div key={item._id} className="fh__item">
              <div className="imageWrapper">
                <img src={item.photos[0]} alt={item.name} />
              </div>
              <div className="details">
                <h3>{item.name}</h3>
                <p>{item.city}</p>
                <p>Starting from ${item.cheapestPrice}</p>
                <div className="review">
                  <div>{item.rating}</div>
                  <p>Excellent</p>
                  <span>2,500 reviews</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="f_right">
        <BsArrowRightCircle
          className="f_arrow"
          onClick={() => handleScroll("R")}
        />
      </div>
    </div>
  );
}

export default FeaturedHotels;

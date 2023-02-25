import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowRight, MdArrowLeft, MdStar } from "react-icons/md";

import "./featuredHotels.scss";
import useFetch from "../../customHooks/useFetch";

function FeaturedHotels() {
  const { data, error, loading } = useFetch("/hotels?featured=true");
  const sliderRef = useRef();
  const navigate = useNavigate();

  const handleScroll = (direction) => {
    const slider = sliderRef.current;
    if (direction === "L") slider.scrollLeft -= 500;
    else if (direction === "R") slider.scrollLeft += 500;
  };

  if (!!error) {
    return <span style={{ color: "red" }}>something went wrong</span>;
  }

  const handleItemClick = (id) => {
    navigate(`/hotels/${id}`);
  };

  return (
    <div className="featured_hotels">
      {loading ? (
        <div>loading</div>
      ) : (
        <>
          {!!data.length && (
            <div className="f_left">
              <button onClick={() => handleScroll("L")} className="f_arrow">
                <MdArrowLeft />
              </button>
            </div>
          )}
          <div ref={sliderRef} className="f_slider">
            {data.map((item) => (
              <div
                key={item._id}
                className="fh__item"
                onClick={() => handleItemClick(item._id)}
              >
                <div className="imageWrapper">
                  <img src={item.photos[0]} alt={item.name} />
                </div>
                <div className="details">
                  <p className="d_city">{item.city}</p>
                  <h2>{item.name}</h2>
                  <div className="review">
                    <p>
                      ${item.cheapestPrice} <span>/ Night</span>
                    </p>
                    <div>
                      <MdStar />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!!data.length && (
            <div className="f_right">
              <button onClick={() => handleScroll("R")} className="f_arrow">
                <MdArrowRight />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FeaturedHotels;

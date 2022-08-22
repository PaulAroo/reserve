import React from "react";
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
  console.log(data);
  return (
    <div className="featured_hotels">
      {loading ? (
        <div>loading</div>
      ) : (
        data.map((item, index) => (
          <div key={item._id} className="fh__item">
            <img src={photos[index]} alt={item.name} />
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
      {/* <div className="fh__item">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max500/103951224.jpg?k=03736dd4e1e89c1132e4957149e394d01ac6e8f64f4b09e30ade97a6176f0640&o="
          alt=""
        />
        <div className="details">
          <h3>Aparthotel Stare Miasto</h3>
          <p>Krakow</p>
          <p>Starting from NGN 34,340</p>
          <div className="review">
            <div>8.8</div>
            <p>Excellent</p>
            <span>2,500 review</span>
          </div>
        </div>
      </div>
      <div className="fh__item">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max500/103951224.jpg?k=03736dd4e1e89c1132e4957149e394d01ac6e8f64f4b09e30ade97a6176f0640&o="
          alt=""
        />
        <div className="details">
          <h3>Aparthotel Stare Miasto</h3>
          <p>Krakow</p>
          <p>Starting from NGN 34,340</p>
          <div className="review">
            <div>8.8</div>
            <p>Excellent</p>
            <span>2,500 review</span>
          </div>
        </div>
      </div>
      <div className="fh__item">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max500/103951224.jpg?k=03736dd4e1e89c1132e4957149e394d01ac6e8f64f4b09e30ade97a6176f0640&o="
          alt=""
        />
        <div className="details">
          <h3>Aparthotel Stare Miasto</h3>
          <p>Krakow</p>
          <p>Starting from NGN 34,340</p>
          <div className="review">
            <div>8.8</div>
            <p>Excellent</p>
            <span>2,500 review</span>
          </div>
        </div>
      </div>
      <div className="fh__item">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max500/103951224.jpg?k=03736dd4e1e89c1132e4957149e394d01ac6e8f64f4b09e30ade97a6176f0640&o="
          alt=""
        />
        <div className="details">
          <h3>Aparthotel Stare Miasto</h3>
          <p>Krakow</p>
          <p>Starting from NGN 34,340</p>
          <div className="review">
            <div>8.8</div>
            <p>Excellent</p>
            <span>2,500 review</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default FeaturedHotels;

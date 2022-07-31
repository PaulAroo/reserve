import React from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import FeaturedHotels from "../../components/featuredHotels/FeaturedHotels";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Header />
      <div className="home__container">
        <Featured />
        <h2>Hotels guests love</h2>
        <FeaturedHotels />
        <div className="newsletter">
          <h2>Save time, save money!</h2>
          <p>Sign up and we'll send the best deals to you</p>
          <div className="email">
            <input type="email" placeholder="Your email" />
            <button>Subscribe</button>
          </div>
          <label htmlFor="free">
            <input type="checkbox" name="book" id="free" />
            Send me a link to get the FREE Booking.com app!
          </label>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import "./featured.scss";

//TODO browse nice hotel pictures for each location
function Featured() {
  return (
    <div className="featured">
      <div className="featured__item">
        <img
          src="https://media.istockphoto.com/photos/abuja-nigeria-landscape-at-sunset-picture-id1398350577?b=1&k=20&m=1398350577&s=170667a&w=0&h=GNbdSLQBbCoe-a1LMThOT7T6FfhuWrSmCMbPgxbXwos="
          alt="abuja"
        />
        <div className="titles">
          <h1>Abuja</h1>
          <h2>150 Hotels</h2>
        </div>
      </div>
      <div className="featured__item">
        <img
          src="https://cf.bstatic.com/xdata/images/city/square250/684500.webp?k=df54bcea224564a0a00497a2076d5338316a0b56692498eddb3c02c9a6cdde64&o="
          alt="lagos"
        />
        <div className="titles">
          <h1>Lagos</h1>
          <h2>150 Hotels</h2>
        </div>
      </div>
      <div className="featured__item">
        <img
          src="https://media.istockphoto.com/photos/abuja-nigeria-landscape-at-sunset-picture-id1398350577?b=1&k=20&m=1398350577&s=170667a&w=0&h=GNbdSLQBbCoe-a1LMThOT7T6FfhuWrSmCMbPgxbXwos="
          alt="lekki"
        />
        <div className="titles">
          <h1>Lekki</h1>
          <h2>150 Hotels</h2>
        </div>
      </div>
      <div className="featured__item">
        <img
          src="https://cf.bstatic.com/xdata/images/city/square250/684500.webp?k=df54bcea224564a0a00497a2076d5338316a0b56692498eddb3c02c9a6cdde64&o="
          alt="ikeja"
        />
        <div className="titles">
          <h1>Ikeja</h1>
          <h2>150 Hotels</h2>
        </div>
      </div>
    </div>
  );
}

export default Featured;

import React from "react";
import useFetch from "../../customHooks/useFetch";
import "./featured.scss";

const photos = [
  "https://media.istockphoto.com/photos/abuja-nigeria-landscape-at-sunset-picture-id1398350577?b=1&k=20&m=1398350577&s=170667a&w=0&h=GNbdSLQBbCoe-a1LMThOT7T6FfhuWrSmCMbPgxbXwos=",
  "https://cf.bstatic.com/xdata/images/city/square250/684500.webp?k=df54bcea224564a0a00497a2076d5338316a0b56692498eddb3c02c9a6cdde64&o=",
  "https://media.istockphoto.com/photos/abuja-nigeria-landscape-at-sunset-picture-id1398350577?b=1&k=20&m=1398350577&s=170667a&w=0&h=GNbdSLQBbCoe-a1LMThOT7T6FfhuWrSmCMbPgxbXwos=",
  "https://media.istockphoto.com/photos/abuja-nigeria-landscape-at-sunset-picture-id1398350577?b=1&k=20&m=1398350577&s=170667a&w=0&h=GNbdSLQBbCoe-a1LMThOT7T6FfhuWrSmCMbPgxbXwos=",
];

//TODO browse nice hotel pictures for each location
function Featured() {
  const { data, error, loading } = useFetch(
    "/hotels/countByCity?city=lekki,abuja,lagos,ikeja"
  );
  return loading ? (
    <div>loading</div>
  ) : (
    <div className="featured">
      {data.map((city, index) => (
        <div key={city.cityName} className="featured__item">
          <img src={photos[index]} alt={city.cityName} />
          <div className="titles">
            <h1>{city.cityName}</h1>
            <h2>
              {city.count} Hotel{city.count > 1 ? "s" : ""}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Featured;

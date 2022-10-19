import "./featuredLocations.scss";
import useFetch from "../../customHooks/useFetch";
import { useNavigate } from "react-router-dom";

const photos = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Lekki-Epe_Expressway_Sandfill_Bustop.jpg/640px-Lekki-Epe_Expressway_Sandfill_Bustop.jpg",
  "https://cf.bstatic.com/xdata/images/city/square250/684500.webp?k=df54bcea224564a0a00497a2076d5338316a0b56692498eddb3c02c9a6cdde64&o=",
  "https://cdn.britannica.com/36/191736-050-5726A7F4/view-Lagos-Nigeria.jpg",
  "https://media.istockphoto.com/photos/abuja-nigeria-landscape-at-sunset-picture-id1398350577?b=1&k=20&m=1398350577&s=170667a&w=0&h=GNbdSLQBbCoe-a1LMThOT7T6FfhuWrSmCMbPgxbXwos=",
];

//TODO browse nice hotel pictures for each location
function FeaturedLocations() {
  const navigate = useNavigate();
  const { data, error, loading } = useFetch(
    "/hotels/countByCity?city=lekki,abuja,Lagos,ikeja"
  );

  const handleSearch = (destination) => {
    navigate("/hotels", { state: { destination } });
  };

  return loading ? (
    <div>loading</div>
  ) : (
    <>
      <h2 className="fl_header">Featured Locations</h2>
      <div className="featuredL">
        {data.map((city, index) => (
          <div
            key={city.cityName}
            className="featured__item"
            onClick={() => handleSearch(city.cityName.toLowerCase())}
          >
            <div className="f_imageWrapper">
              <img src={photos[index]} alt={city.cityName} />
            </div>
            <div className="titles">
              <h1>{city.cityName}</h1>
              <h2>
                {city.count} Hotel{city.count > 1 ? "s" : ""}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FeaturedLocations;

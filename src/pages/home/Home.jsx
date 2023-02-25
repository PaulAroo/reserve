import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import FeaturedLocations from "../../components/featuredLocations/FeaturedLocations";
import SearchBar from "../../components/searchBar/SearchBar";
import FeaturedHotels from "../../components/featuredHotels/FeaturedHotels";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <header>
        <div className="hero_title">
          <h1>Find your next stay</h1>
          <p>Search deals on hotels, homes, and much more...</p>
        </div>
      </header>
      <SearchBar />
      <main className="home__container">
        <FeaturedLocations />
        <h1>Hotels guests love</h1>
        <FeaturedHotels />
        <div className="newsletter">
          <h2>Save time, save money!</h2>
          <p>Sign up and we'll send the best deals to you</p>
          <div className="email">
            <input type="email" placeholder="Your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;

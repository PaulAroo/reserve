import React from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Header />
    </div>
  );
}

export default Home;

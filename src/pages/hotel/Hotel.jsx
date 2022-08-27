import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./hotel.scss";
import { MdLocationPin } from "react-icons/md";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../customHooks/useFetch";
import { useContext } from "react";
import { SearchContext } from "../../context/search-context";
import { calculateDaysDifference } from "../../utils/days-difference";
import { AuthContext } from "../../context/auth-context";
import BookingModal from "../../components/bookingModal/BookingModal";

const images = [
  {
    src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
  },
  {
    src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
  },
  {
    src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
  },
  {
    src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
  },
  {
    src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
  },
  {
    src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
  },
];

function Hotel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSlider, setOpenSlider] = useState(false);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [sliderNumber, setSliderNumber] = useState(0);
  const { dates, options } = useContext(SearchContext);

  const id = location.pathname.split("/")[2];
  const { loading, data, error } = useFetch(`/hotels/find/${id}`);

  const handleSlider = (imageIndex) => {
    setOpenSlider(true);
    setSliderNumber(imageIndex);
  };

  const handleScroll = (direction) => {
    if (direction === "L")
      setSliderNumber((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    else if (direction === "R")
      setSliderNumber((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const noOfNights = calculateDaysDifference(
    dates[0]?.endDate,
    dates[0]?.startDate
  );

  const { user } = useContext(AuthContext);
  const handleBooking = () => {
    if (!user) navigate("/login");
    else setOpenBookingModal(true);
  };

  return (
    <div className="hotel__page">
      <Navbar />
      <div className="hotel__container">
        {openSlider && (
          <div className="slider">
            <ImCancelCircle
              className="close"
              onClick={() => setOpenSlider(false)}
            />
            <BsArrowLeftCircle onClick={() => handleScroll("L")} />
            <div className="slider__wrapper">
              <img src={images[sliderNumber].src} />
            </div>
            <BsArrowRightCircle onClick={() => handleScroll("R")} />
          </div>
        )}
        <div className="hotel__container__header">
          <div className="details">
            <h1>{data.name}</h1>
            <div className="location">
              <MdLocationPin />
              {data.address}.
            </div>
          </div>
          <button>Reserve or Book now</button>
        </div>
        <div className="hotel__gallery">
          {images.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              onClick={() => handleSlider(index)}
            />
          ))}
        </div>
        <div className="hotel__details">
          <div className="text">
            <h1>{data.title}</h1>
            <p>{data.desc}</p>
          </div>
          <div className="cta">
            <h2>perfect for a {noOfNights}-night stay</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              consectetur est veniam nobis nam, facilis eius earum officia
              deserunt! Modi.
            </p>
            <p className="price">
              <strong>
                ${noOfNights * options.rooms * data.cheapestPrice}
              </strong>{" "}
              {`(${noOfNights} night${noOfNights > 1 ? "s" : ""})`}
            </p>
            <button onClick={handleBooking}>Reserve or Book Now!</button>
          </div>
        </div>
        {openBookingModal && (
          <BookingModal setOpenModal={setOpenBookingModal} hotelId={id} />
        )}
      </div>
    </div>
  );
}

export default Hotel;

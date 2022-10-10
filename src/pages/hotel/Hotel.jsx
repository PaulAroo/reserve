import { MdLocationPin } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/search-context";
import { calculateDaysDifference } from "../../utils/days-difference";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

import "./hotel.scss";
import useFetch from "../../customHooks/useFetch";
import Navbar from "../../components/navbar/Navbar";
import BookingModal from "../../components/bookingModal/BookingModal";

function Hotel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSlider, setOpenSlider] = useState(false);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [sliderNumber, setSliderNumber] = useState(0);
  const { dates, options } = useContext(SearchContext);

  const id = location.pathname.split("/")[2];
  const { loading, data, error } = useFetch(`/hotels/find/${id}`);
  const images = data.photos;

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
              <img src={images[sliderNumber]} />
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
          {data.photos?.map((image, index) => (
            <div
              key={index}
              onClick={() => {
                handleSlider(index);
              }}
              className="hg_wrapper"
            >
              <img src={image} />
            </div>
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

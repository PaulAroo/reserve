import { useNavigate } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";
import React, { useContext, useState } from "react";
import { SearchContext } from "../../context/search-context";

import "./bookingModal.scss";
import axios from "../../axios";
import useFetch from "../../customHooks/useFetch";
import getDatesInRange from "../../utils/gets-dates-range";

function BookingModal({ setOpenModal, hotelId }) {
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/rooms/${hotelId}`);
  const { dates } = useContext(SearchContext);

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpenModal(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const noAvailableRooms = data.length === 0;
  const noSelectedRooms = selectedRooms.length === 0;

  return (
    <div className="bookingModal">
      <div className="blanket" />
      <div className="modal_container">
        <ImCancelCircle className="close" onClick={() => setOpenModal(false)} />
        {noAvailableRooms ? (
          <p>no available rooms</p>
        ) : (
          <>
            <span>Select your rooms</span>
            {data.map((item) => (
              <div className="rItem" key={item?._id}>
                <div className="rItemInfo">
                  <div className="rTitle">{item?.title}</div>
                  <div className="rDesc">{item?.desc}</div>
                  <div className="rMax">
                    Max people: <b>{item?.maxPeople}</b>
                  </div>
                  <div className="rPrice">${item?.price}</div>
                </div>
                <div className="rSelectRooms">
                  {item?.roomNumbers.map((roomNumber, index) => (
                    <div className="room" key={index}>
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
        <button
          disabled={noSelectedRooms}
          onClick={handleClick}
          className="rButton"
        >
          Reserve Now!
        </button>
      </div>
    </div>
  );
}

export default BookingModal;

import React from "react";
import "./bookingModal.scss";
import { ImCancelCircle } from "react-icons/im";

function BookingModal({ setOpenModal, hotelId }) {
  return (
    <div className="bookingModal">
      <div className="blanket" onClick={() => setOpenModal(false)} />
      <div className="modal_container">
        <ImCancelCircle className="close" onClick={() => setOpenModal(false)} />
      </div>
    </div>
  );
}

export default BookingModal;

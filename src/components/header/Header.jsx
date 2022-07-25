import React, { useState } from "react";
import "./header.scss";
import { BsFillPersonFill } from "react-icons/bs";
import { FaRoad, FaRegCalendarAlt } from "react-icons/fa";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function Header() {
  const [showDateRange, setShowDateRange] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  return (
    <div className="header">
      <div className="header__container">
        <h1>Find your next stay</h1>
        <p>Search deals on hotels, homes, and much more...</p>
        <div className="header__search">
          <div className="search">
            <FaRoad />
            <input
              type="text"
              placeholder="where are you going?"
              className="search__input"
            />
          </div>
          <div className="date">
            <FaRegCalendarAlt />
            <span onClick={() => setShowDateRange(true)}>
              {" "}
              Check-in - Check-out
            </span>
            {showDateRange && (
              <>
                <div
                  className="blanket"
                  onClick={() => setShowDateRange(false)}
                />
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className="date__range"
                />
              </>
            )}
          </div>
          <div className="occupants">
            <BsFillPersonFill />
            <span>1 adult - 0 children - 1 room</span>
          </div>
          <button>Search</button>
        </div>
      </div>
    </div>
  );
}

export default Header;

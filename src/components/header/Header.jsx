import { format } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { FaRoad, FaRegCalendarAlt } from "react-icons/fa";
import { BsFillPersonFill, BsChevronExpand } from "react-icons/bs";

import "./header.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [showDateRange, setShowDateRange] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState({
    adults: 1,
    children: 0,
    rooms: 1,
  });

  const renderOccupantString = () => {
    const { adults, children, rooms } = options;
    return `${adults} adult${adults > 1 ? "s" : ""} • ${children} ${
      children === 1 ? "child" : "children"
    } • ${rooms} room${rooms > 1 ? "s" : ""}`;
  };

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
    }));
  };

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };

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
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="date" onClick={() => setShowDateRange(true)}>
            <FaRegCalendarAlt />
            <span>
              {" "}
              {format(date[0].startDate, "dd/MM/yyyy")} -{" "}
              {format(date[0].endDate, "dd/MM/yyyy")}
            </span>
            {showDateRange && (
              <>
                <div
                  className="blanket"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDateRange(false);
                  }}
                />
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className="date__range"
                  minDate={new Date()}
                />
              </>
            )}
          </div>
          <div
            className="occupants"
            onClick={() => {
              setShowOptions(true);
            }}
          >
            <BsFillPersonFill />
            <span>{renderOccupantString()}</span>
            <BsChevronExpand className="chevrons" />
            {showOptions && (
              <>
                <div
                  className="blanket"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowOptions(false);
                  }}
                />
                <div className="options__menu">
                  <div className="option__item">
                    <p>Adult</p>
                    <div>
                      <button
                        onClick={() => handleOption("adults", "d")}
                        disabled={options.adults < 2}
                      >
                        -
                      </button>
                      <span>{options.adults}</span>
                      <button onClick={() => handleOption("adults", "i")}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="option__item">
                    <p>Children</p>
                    <div>
                      <button
                        onClick={() => handleOption("children", "d")}
                        disabled={options.children === 0}
                      >
                        -
                      </button>
                      <span>{options.children}</span>
                      <button onClick={() => handleOption("children", "i")}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="option__item">
                    <p>Room</p>
                    <div>
                      <button
                        onClick={() => handleOption("rooms", "d")}
                        disabled={options.rooms < 2}
                      >
                        -
                      </button>
                      <span>{options.rooms}</span>
                      <button onClick={() => handleOption("rooms", "i")}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
}

export default Header;

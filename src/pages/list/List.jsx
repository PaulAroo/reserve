import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";

import "./list.scss";
import Navbar from "../../components/navbar/Navbar";
import ResultItem from "../../components/resultItem/ResultItem";

function List() {
  const location = useLocation();
  const [destination, setDestination] = useState("");
  const [showDateRange, setShowDateRange] = useState(false);
  const [options, setOptions] = useState({
    adults: 1,
    children: 0,
    rooms: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "option",
    },
  ]);

  useEffect(() => {
    if (location.state) {
      setDestination(location.state.destination);
      setOptions(location.state.options);
      setDate(location.state.date);
    }
  }, []);

  return (
    <div className="list">
      <Navbar />
      <div className="list__container">
        <div className="wrapper">
          <div className="search">
            <header>Search</header>
            <label htmlFor="destination">
              Destination
              <input
                type="text"
                placeholder="lagos"
                id="destination"
                value={destination}
              />
            </label>
            <div className="ckeckIn">
              <p>Check-in date</p>
              <span
                onClick={() => setShowDateRange(true)}
                className="date"
              >{`${format(date[0].startDate, "dd/MM/yyyy")} - ${format(
                date[0].endDate,
                "dd/MM/yyyy"
              )}`}</span>
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
            <div className="options">
              <p>Options</p>
              <div>
                <label htmlFor="min_price">
                  Min price <small>(per night)</small>
                </label>
                <input type="number" id="min_price" />
              </div>
              <div>
                <label htmlFor="max_price">
                  Max price <small>(per night)</small>
                </label>
                <input type="number" id="max_price" />
              </div>
              <div>
                <label htmlFor="adult">Adult</label>
                <input
                  type="number"
                  min="1"
                  id="adult"
                  value={options.adults}
                />
              </div>
              <div>
                <label htmlFor="children">Children</label>
                <input
                  type="number"
                  min="0"
                  id="children"
                  value={options.children}
                />
              </div>
              <div>
                <label htmlFor="room">Room</label>
                <input type="number" min="1" id="room" value={options.rooms} />
              </div>
            </div>
            <button>search</button>
          </div>
          <div className="results">
            <ResultItem />
            <ResultItem />
            <ResultItem />
            <ResultItem />
            <ResultItem />
            <ResultItem />
            <ResultItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;

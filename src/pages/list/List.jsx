import React, { useState } from "react";
import "./list.scss";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

function List() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [options, setOptions] = useState(location.state.options);
  const [date, setDate] = useState(location.state.date);

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
              <span className="date">{`${format(
                date[0].startDate,
                "dd/MM/yyyy"
              )} - ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
            </div>
            <div className="options">
              <p>Options</p>
              <div>
                <label htmlFor="min_price">
                  Min price <span>(per night)</span>
                </label>
                <input type="number" id="min_price" />
              </div>
              <div>
                <label htmlFor="max_price">
                  Max price <span>(per night)</span>
                </label>
                <input type="number" id="max_price" />
              </div>
              <div>
                <label htmlFor="adult">Adult</label>
                <input type="number" id="adult" value={options.adults} />
              </div>
              <div>
                <label htmlFor="children">Children</label>
                <input type="number" id="children" value={options.children} />
              </div>
              <div>
                <label htmlFor="room">Room</label>
                <input type="number" id="room" value={options.rooms} />
              </div>
            </div>
            <button>search</button>
          </div>
          <div className="results"></div>
        </div>
      </div>
    </div>
  );
}

export default List;

import { format } from "date-fns";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";

import "./list.scss";
import Navbar from "../../components/navbar/Navbar";
import ResultItem from "../../components/resultItem/ResultItem";
import useFetch from "../../customHooks/useFetch";

function List() {
  const location = useLocation();
  const [destination, setDestination] = useState(
    location.state?.destination || ""
  );
  const [date, setDate] = useState(
    location.state?.dates || [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "option",
      },
    ]
  );
  const [options, setOptions] = useState(
    location.state?.options || {
      adults: 1,
      children: 0,
      rooms: 1,
    }
  );
  const [showDateRange, setShowDateRange] = useState(false);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(999);
  // const [options, setOptions] = useState({
  //   adults: 1,
  //   children: 0,
  //   rooms: 1,
  // });
  // const [date, setDate] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "option",
  //   },
  // ]);

  const { data, loading, reFetch, error } = useFetch(
    `/hotels?${destination ? `city=${destination}` : ""}&min=${min}&max=${max}`
  );

  const handleSearch = () => reFetch();

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
                onChange={(e) => setDestination(e.target.value)}
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
                <input
                  onChange={(e) => setMin(e.target.value)}
                  type="number"
                  id="min_price"
                  value={min}
                />
              </div>
              <div>
                <label htmlFor="max_price">
                  Max price <small>(per night)</small>
                </label>
                <input
                  onChange={(e) => setMax(e.target.value)}
                  type="number"
                  id="max_price"
                  value={max}
                />
              </div>
              <div>
                <label htmlFor="adult">Adult</label>
                <input
                  onChange={() => {}}
                  type="number"
                  min="1"
                  id="adult"
                  value={options.adults}
                />
              </div>
              <div>
                <label htmlFor="children">Children</label>
                <input
                  onChange={() => {}}
                  type="number"
                  min="0"
                  id="children"
                  value={options.children}
                />
              </div>
              <div>
                <label htmlFor="room">Room</label>
                <input
                  onChange={() => {}}
                  type="number"
                  min="1"
                  id="room"
                  value={options.rooms}
                />
              </div>
            </div>
            <button onClick={handleSearch}>search</button>
          </div>
          <div className="results">
            {loading ? (
              <div>loading</div>
            ) : (
              data.map((item) => <ResultItem item={item} key={item._id} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;

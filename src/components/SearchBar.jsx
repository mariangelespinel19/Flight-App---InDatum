import React, { useEffect, useState } from "react";
import { searchFlights, searchByPrice, orderByHour } from "../utils/getData";
import Modal from "./Modal";
import "./styles.css";

const SearchBar = ({ flights }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState([]);
  const [hour, setHour] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [idFlight, setIdFlight] = useState("");
  const [prices, setPrices] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const [formValues, setFormValues] = useState({
    cityFrom: "",
    cityDestination: "",
    date: "",
    passengers: "",
  });
  const [isInvalid, setIsInvalid] = useState(false);
  useEffect(() => {
    setSearchResults(flights);
    setFilters(flights);
  }, [flights]);

  const handleInputChange = (event) => {
    console.log(Date.now().toLocaleString()) 
    console.log(event.target.value);
    if (event.target.name === "date") {
      if (event.target.valueAsNumber <= Date.now()) {
        setIsInvalid(true);
      } else {
        setIsInvalid(false);
      }
    }
    if (event.target.name === "passengers" && event.target.value > 0) {
      setFormValues({
        ...formValues,
        [event.target.name]: parseInt(event.target.value),
      });
    } else {
      setFormValues({
        ...formValues,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handlePricesChange = (event) => {
    setPrices({
      ...prices,
      [event.target.name]: event.target.value,
    });
  };

  const changeIdFlight = (event) => {
    setIdFlight(event.target.value);
    setShowModal(true);
  };

  const handleSearchPrice = () => {
    const resultPrices = searchByPrice(filters, prices);
    setSearchResults(resultPrices);
  };

  const handleOrderHour = () => {
    const hourFilter = orderByHour(filters, hour);
    setSearchResults(hourFilter);
  };

  const allValuesFilled = Object.values(formValues).every(
    (value) => value !== ""
  );
  const allValuesPriceFilled = Object.values(prices).every(
    (value) => value !== ""
  );
  const priceError =
    parseInt(prices.maxPrice) < parseInt(prices.minPrice) ? true : false;
  const handleSearch = () => {
    const result = searchFlights(filters, formValues);
    setSearchResults(result);
    setFilters(result);
    setFormValues({
      cityFrom: "",
      cityDestination: "",
      date: "",
      passengers: "",
    });
  };

  if (!flights) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <header className="navbar">
        <h1 className="navbar__title">Hi World</h1>
        {/* <div className="navbar__info"> */}
          <div className="navbar__vuelos">
            <h1>Search flights</h1>
            <label htmlFor="">CityFrom</label>
            <select name="cityFrom" id="cityFrom" onChange={handleInputChange}>
              <option>departure City</option>
              {flights?.map((flight) => {
                return (
                  <>
                    <option
                      placeholder="City From"
                      name="cityFrom"
                      key={flight._id}
                      value={flight.cityFrom}
                    >
                      {flight.cityFrom}
                    </option>
                  </>
                );
              })}
            </select>

            <label htmlFor="">CityTo</label>
            <select
              name="cityDestination"
              id="cityDestination"
              onChange={handleInputChange}
            >
              <option>City To</option>
              {flights?.map((flight) => {
                return (
                  <>
                    <option
                      placeholder="City To"
                      name="cityDestination"
                      key={flight._id}
                      value={flight.cityTo}
                    >
                      {flight.cityTo}
                    </option>
                  </>
                );
              })}
            </select>

            <input
              type="date"
              name="date"
              placeholder="Date"
              invalid={isInvalid}
              value={formValues.date}
              required
              onChange={handleInputChange}
            />
            {isInvalid && (
              <div style={{ color: "red" }}>
              The date must be the same or later than the current date.
              </div>
            )}
            <input
              type="number"
              name="passengers"
              placeholder="seats"
              value={formValues.passengers}
              onChange={handleInputChange}
              min={1}
              max={322}
            />
            <button
              disabled={!allValuesFilled | isInvalid}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div className="navbar__prices">
            <label>Filter by prices</label>
            <input
              type="number"
              name="minPrice"
              placeholder="min-price"
              value={prices.minPrice}
              onChange={handlePricesChange}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="max-price"
              value={prices.maxPrice}
              onChange={handlePricesChange}
            />
            {priceError && (
              <div
                style={{ color: "red" }}
              >{`El precio maximo elegido: ${prices.maxPrice} debe ser mayor al precio minimo elegido: ${prices.minPrice}`}</div>
            )}
            <button
              disabled={!allValuesPriceFilled | priceError}
              onClick={handleSearchPrice}
            >
              Filter
            </button>
          </div>
          <div className="navbar__hours">
            <input
              type="time"
              name="time"
              placeholder="17:05 p.m"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
            />
            <p>Results will be in the range of two hours.</p>
            <button onClick={handleOrderHour}>Buscar por hora</button>
          </div>
        {/* </div> */}
      </header>
      <div>
        {Array.isArray(searchResults) ? (
          searchResults.map((flight) => {
            return (
              <div key={flight._id}>
                <h2>ID: {flight._id}</h2>
                <h1>From: {flight.cityFrom}</h1>
                <h2>To: {flight.cityTo}</h2>
                <h2>Price: {flight.price}</h2>
                <h2>Hour: {flight.date.slice(11, 25)}</h2>
                <h2>AvailableSeats: {flight.availableSeats}</h2>
                <h2>Date: {flight.date.slice(0, 10)}</h2>
                {/* Renderizado condicional del modal, XD */}
                <button value={flight._id} onClick={(e) => changeIdFlight(e)}>
                  Purchase
                </button>
              </div>
            );
          })
        ) : (
          <h1>{searchResults.message}</h1>
        )}
      </div>
      <div>
        {showModal && <Modal id={idFlight} setModal={setShowModal}></Modal>}
      </div>
    </div>
  );
};

export default SearchBar;

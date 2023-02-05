import React, { useEffect, useState } from "react";
import { searchFlights, searchByPrice, orderByHour, getFlightId } from "../utils/getData.js";
import Modal from "./Modal";

const SearchBar = ({flights}) => {
    const [searchResults, setSearchResults] = useState([]);
    const [ filters, setFilters] = useState([])
    const [hour, setHour] = useState({
        order:''
    })
    const [prices, setPrices] =useState({
        minPrice: "",
        maxPrice: ""
    })
    const [formValues, setFormValues] = useState({
        cityFrom: '',
        cityDestination: '',
        date: '',
        passengers: '',
    });
    const [isInvalid, setIsInvalid] = useState(false);
    useEffect(() => {
        setSearchResults(flights);
        setFilters(flights);
    }, [flights])

    const handleInputChange = (event) => {
        if (event.target.name === 'date'){
            if(event.target.valueAsNumber < Date.now()) {
                setIsInvalid(true);
            } else {
                setIsInvalid(false);
            }
        }
    
    if (event.target.name === 'passengers' && event.target.value > 0){
        setFormValues({
            ...formValues,
            [event.target.name]: parseInt(event.target.value)
        });
    } else {
        if (event.target.name === 'cityFrom') console.log(event.target.value)
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
    })
}

const handleSearchPrice = () => {
    const resultPrices = searchByPrice(filters, prices);
    setSearchResults(resultPrices);
}

const handleOrderHour = () => {
    const hourFilter = orderByHour(filters, hour)
    setSearchResults(hourFilter);
}

const allValuesFilled = Object.values(formValues).every((value) => value !== ''
)
const allValuesPriceFilled = Object.values(prices).every((value) => value !==''
)
const priceError = 
  parseInt(prices.maxPrice) < parseInt(prices.minPrice) ? true : false;
const handleSearch = () => {
    const result = searchFlights(filters, formValues);
    setSearchResults(result);
    setFilters(result);
    setFormValues({
        cityFrom:'',
        cityDestination: '',
        date: '',
        passengers: '',
    })
}

if (!filters.length){
    return<h1>Cargando...</h1>
}
return (
    <div>
        <div>
            <h1>Search Flights</h1>
            <label htmlFor="">CityFrom</label>
                <select name="cityFrom" id="cityFrom" onChange={handleInputChange}>
                  <option>Departure City</option>
                    { flights?.map( (flight) => {
                        return(
                            <>
                                <option
                                placeholder="City From"
                                name= "CityFrom"
                                key={flight._id}
                                value={flight.cityFrom}
                                >
                                  {flight.cityFrom}
                                </option>
                            </>
                         );
                     })}
                  </select>      

                  <label htmlFor="">cityTo</label>
                  <select name="CityDestination" id="cityDestination"
                  onChange={handleInputChange}
                  >
                    <option>City of Destination</option>
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
                    <div style={{color: "red"}}>
                    The date must be the same or later than the current date
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
                  <button disabled={!allValuesFilled | isInvalid} onClick={handleSearch}>
                    Search
                  </button> 
                </div>

                <div>
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
                    >{`The maximum price chosen:${prices.maxPrice} must be higher than the minimum price chosen:`}
                    </div>
                )}
                <button
                disabled={!allValuesPriceFilled | priceError}
                onClick={handleSearchPrice}
                >
                  {" "}
                  Filtrar{" "}
                </button>  

                </div>
                  <input
                    type="time"
                    name="time"
                    placeholder="17:05 pm"
                    value = {hour}
                    onChange={(e) => setHour(e.target.value)}
                  />
                  <p>The results will be in a range of two hours</p>
                  <button onClick={handleOrderHour}>Buscar por hora</button>  
                </div>
)
}






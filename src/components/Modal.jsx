import React, { useEffect, useState } from "react";
import { getFlightId, exChangeRate } from "../utils/getData";

// the modal creates a window in which a summary of the flight information selected by the user will be displayed when clicking on the "buy" button.
const Modal = ({ id, setModal }) => {
  const [detail, setDetailFlight] = useState();
  const [buttonBuy, setButtonBuy] = useState(true);
  const [buyFlight, setBuyFlight] = useState({
    currency: "",
    indatumMiles: "",
    finalPrice: "",
    ...detail,
  });
  useEffect(() => {
    if (id) {
      const flightId = async () => {
        const idFlight = await getFlightId(id);
        setDetailFlight(idFlight);
      };
      flightId();
    }
  }, [id]);

//   calculate the number of gained miles, obtains the exchange rate of COP, and sets the buyFlight state object with the updated values, including the selected currency, the final price, and the gained miles
  const handleCurrency = async (event) => {
    setButtonBuy(false);
    const gainedMiles = Math.round(detail.price / 1.67);
    const priceFinal = await exChangeRate();
    const COPrate = priceFinal.conversion_rates.COP;
    setBuyFlight({
      ...buyFlight,
      ...detail,
      currency: event.target.value,
      finalPrice: Math.round(
        event.target.value === "COP" ? COPrate * detail.price : detail.price
      ),
      indatumMiles: gainedMiles,
    });
  };
// store data in the local storage of the browser
  const handleSaveData = () => {
    localStorage.setItem(
      "indatum-flights-reservation",
      JSON.stringify(buyFlight)
    );
  };

  if (!detail) {
    return <h1>Loading.....</h1>;
  }
  return (
    <div>
      <h2>City From: {detail.cityFrom}</h2>
      <h2>City To: {detail.cityTo}</h2>
      <h2>Price: {detail.price}</h2>
      <h2>Date: {detail.date.slice(0, 10)}</h2>
      <h2>Hour: {detail.date.slice(11, 25)}</h2>
      <select name="currency" id="" onChange={handleCurrency}>
        <option value="">Select Currency</option>
        <option value="USD">USD</option>
        <option value="COP">COP</option>
      </select>
      <h4>
        Final price:{" "}
        {buyFlight.finalPrice !== "" ? (
          <p>
            {buyFlight.currency}: {buyFlight.finalPrice}
          </p>
        ) : (
          <p>
            {buyFlight.currency}: {detail.price}
          </p>
        )}
      </h4>
      <p>You have gained {buyFlight.indatumMiles} miles</p>
      <p>Before purchasing select the type of currency</p>
      <button disabled={buttonBuy} onClick={handleSaveData}>
        Purchase
      </button>
      <button onClick={() => setModal(false)}>Cancel</button>
    </div>
  );
};

export default Modal;
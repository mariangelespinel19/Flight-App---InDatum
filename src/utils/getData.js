async function getFlightId (id) {
    try{
        const url = `https://flights-api-production.up.railway.app/api/flights/${id}`
        const flightId = await fetch(url)
        .then(res => res.json())
        return flightId
    }   catch (error) {
        console.log(error)
    }
}

async function getData () {
    try {
        const url = "https://flights-api-production.up.railway.app/api/flights"
        const data = await fetch(url)
        .then(res => res.json())
        return sortPrice(data)
    }   catch (error){
        console.log(error)
    }
}

function sortPrice(flights) {
    const sortPrices = flights.sort((a, b) => a.price -b.price)
    return sortPrices
}

function searchFlights(flights, data){
    const flightsResult = flights.filter( (flight) =>
      flight.availableSeats > data.passengers &&
      flight.cityFrom.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(data.cityFrom.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) && 
      flight.cityTo.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(data.cityDestination.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) &&
      flight.date.slice(0, 10) === data.date
    )
    return flightsResult.length ? flightsResult : {message: 'No flight available'}
  }

  function searchByPrice (stateFlights, prices){
    const result = stateFlights.filter( (flight) => flight.price >= prices.minPrice && flight.price <= prices.maxPrice)
    return result.length ? result : {message: 'There is not flights for that range of prices'}
  }

  function orderByHour (stateFlights, hour) {
    //hour = '17:00' o '04:00'
    let range = [parseInt(hour) +2, parseInt(hour) -2]
    console.log(range[0].toString().length)
    range = [range[0].toString().length === 1? '0' + range[0].toString() + ':00' : range[0].toString() + ':00',
            range[1].toString().length === 1 ? '0' + range[1].toString() + ':00' : range[1].toString() + ':00'
    ]
    const flightsHour = stateFlights.filter( (flight) => flight.date.slice(11, 16) < range[0] && flight.date.slice(11, 16) > range[1] )
    return flightsHour.length ? flightsHour : {message: 'There is not flights for that time range'}
  }

  export { getData, searchFlights, sortPrice, searchByPrice, orderByHour, getFlightId};

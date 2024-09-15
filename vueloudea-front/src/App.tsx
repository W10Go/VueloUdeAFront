import { useState, useEffect } from 'react'
import flightService from './services/flights'
import { Flight } from './types/types'
import './App.css'
import { Flights } from './components/Flights'


function App() {
  const [flights, setFlights] = useState<Flight[] | null>(null)
  const [flightsToShow, setFlightsToShow] = useState<Flight[] | null>(null)
  const [showOrigin, setShowOrigin] = useState<boolean>(false)
  const [showDestination, setShowDestination] = useState<boolean>(false)
  const [showPrice, setShowPrice] = useState<boolean>(false)


  const [dateBegin, setDateBegin] = useState<string>('')
  const [dateEnd, setDateEnd] = useState<string>('')
  const [origin, setOrigin] = useState<string>('')
  const [destination, setDestination] = useState<string>('')
  const [price, setPrice] = useState<string>('')

  const resetFlights = () => {
    flightService.getAll()
      .then((initialFlights: Flight) => {
        setFlights(initialFlights)
        setFlightsToShow(initialFlights)
      })
  }

  useEffect(() => {
    resetFlights()
  }, [])


  const flightFilter = () => {
    let auxFlightsToShow = flights?.filter(flight => flight.origin.toLowerCase().includes(origin.toLowerCase()))
    auxFlightsToShow = auxFlightsToShow?.filter(flight => flight.destination.toLowerCase().includes(destination.toLowerCase()))
    setFlightsToShow(auxFlightsToShow?.filter(flight => flight.price.toString().includes(price)))
  }

  useEffect(() => {
    if (dateBegin != '' && dateEnd != '') {
      const dateSplitedBegin = dateBegin.split('-')
      const dateSplitedEnd = dateEnd.split('-')
      flightService.getByDates(dateSplitedBegin[0], dateSplitedEnd[0], dateSplitedBegin[1]
        , dateSplitedEnd[1], dateSplitedBegin[2], dateSplitedEnd[2])
        .then((responseFlights) => {

          setFlights(responseFlights)
          setFlightsToShow(responseFlights)
        })
    }
    flightFilter()
  }, [dateBegin, dateEnd, origin, destination, price])

  const handleOriginChange = (event) => {
    setOrigin(event.target.value)
  }

  const handleDestinationChange = (event) => {
    setDestination(event.target.value)
  }

  const handlePriceChange = (event) => {
    setPrice(event.target.value)
  }
  const handleDateBegin = (event) => {
    setDateBegin(event.target.value)
  }

  const handleDateEnd = (event) => {
    setDateEnd(event.target.value)
  }
  const handleButtonDates = (event) => {
    setDateBegin('')
    setDateEnd('')
    resetFlights()
  }

  const handleHideOrigin = (event) => {
    if (event.target.checked == true) {
      setShowOrigin(true)
    }
    else {
      setShowOrigin(false)
    }

  }
  const handleHideDestination = (event) => {
    if (event.target.checked == true) {
      setShowDestination(true)
    }
    else {
      setShowDestination(false)
    }
    console.log(showDestination);


  }

  const handleHidePrice = (event) => {
    if (event.target.checked == true) {
      setShowPrice(true)
    }
    else {
      setShowPrice(false)
    }

  }
  return (
    <>
      <form>
        <div>
          <input type="date" value={dateBegin} onChange={handleDateBegin} />-
          <input type="date" value={dateEnd} onChange={handleDateEnd} />
          <input type="button" value="Reset Dates" onClick={handleButtonDates} />
        </div>
        <div>
          <ul>
            <li><input type="checkbox" id='1' name="Origin Checkbox" onClick={handleHideOrigin} />
              <label>Filter by origin</label>
              {
                showOrigin ? <input type="text"
                  value={origin}
                  name='Filter by origin'
                  placeholder='Filter by origin'
                  onChange={handleOriginChange} /> : <></>
              }
            </li>
            <li>
              <input type="checkbox" id='2' name="Destination Checkbox" onClick={handleHideDestination} />
              <label>Filter by destination</label>
              {
                showDestination ? <input type="text"
                  value={destination}
                  name='Filter by destination'
                  placeholder='Filter by destination'
                  onChange={handleDestinationChange} /> : <></>
              }
            </li>
            <li>
              <input type="checkbox" id='2' name="Price Checkbox" onClick={handleHidePrice} />
              <label>Filter by destination</label>
              {
                showPrice ?
                  <input type="text"
                    value={price}
                    name='Filter by price'
                    placeholder='Filter by price'
                    onChange={handlePriceChange} />
                  : <></>
              }
            </li>
          </ul>
        </div>


      </form>
      <table>
        <thead className="bg-neutral-300">
          <tr>
            <th>Origin</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {flightsToShow?.map(flight =>
            <>
              <tr>
                <Flights key={flight.id} flight={flight} />
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  )
}

export default App
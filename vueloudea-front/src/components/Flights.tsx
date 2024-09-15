import { FlightsProps, Flight } from "../types/types"

export const Flights = ({ flight }: FlightsProps) => {
    const flightToShow: Flight = flight


    return (
        <>
            <td>{flightToShow.origin}</td>
            <td>{flightToShow.destination}</td>
            <td>{flightToShow.date}</td>
            <td>{flightToShow.price}$</td>

        </>
    )
}
export interface FlightsProps {
    flight: Flight
}

export type Flight = {
    date: string,
    destination: string,
    id: number,
    origin: string,
    price: number
}

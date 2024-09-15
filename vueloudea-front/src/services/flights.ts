import axios from "axios";


const baseUrl = 'http://localhost:8080/api/flights/'

const getAll = () => {
    return axios.get(`${baseUrl}searchAll`).then(response => response.data)
}
const getByDates = (yearBegin: number, yearEnd: number, monthBegin: number, monthEnd: number, dayBegin: number, dayEnd: number
) => {
    return axios.get(`${baseUrl}search?startDate=${yearBegin}-${monthBegin}-${dayBegin}&endDate=${yearEnd}-${monthEnd}-${dayEnd}`)
        .then(response => response.data)
}

export default { getAll, getByDates }

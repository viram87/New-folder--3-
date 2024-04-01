import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: `https://wft-geo-db.p.rapidapi.com/v1/geo`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
});

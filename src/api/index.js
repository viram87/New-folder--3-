import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: `https://wft-geo-db.p.rapidapi.com/v1/geo`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-RapidAPI-Key": "c416197b14mshad380e89dff166ep19ab66jsn771466cca19e",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
});

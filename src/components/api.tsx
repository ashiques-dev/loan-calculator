import axios from "axios";

export const axiosApi = axios.create({
  baseURL: `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_API_KEY}/`,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});

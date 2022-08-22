import { useState, useEffect } from "react";
import axios from "../axios";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log(0, "called");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }
    fetchData();
  }, [url]);

  async function reFetch() {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }

  return { data, loading, error, reFetch };
}

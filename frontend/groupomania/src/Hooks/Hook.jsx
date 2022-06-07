import { useState, useEffect } from "react";

export function useFetch(url) {
  const token = JSON.parse(localStorage.getItem("tokens"));

  const [data, setData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;
    async function fetchData() {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }
    fetchData();
  }, [url, token]);
  return { data, error };
}

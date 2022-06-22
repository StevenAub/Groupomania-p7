import { useState, useEffect } from "react";

export function useFetch(url) {
  const token = JSON.parse(localStorage.getItem("tokens"));

  const [data, setData] = useState([]);
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
        setError(true);
      }
    }
    fetchData();
  }, [url, token]);
  return { data, error };
}
/*
const token = JSON.parse(localStorage.getItem("tokens"));

export function getList() {
  return fetch("http://localhost:8080/api/post", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then((data) => data.json());
}

export function setItem(item) {
  return fetch("http://localhost:8080/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ item })
  }).then((data) => data.json());
}
*/

import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import Button from "@mui/material/Button";

export default function LikePost(post) {
  const token = JSON.parse(localStorage.getItem("tokens"));
  const postId = post.id;
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/like/${postId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        console.log(result.data);
        setLikes(result.data);
      });
  }, [token, postId]);

  async function liked() {
    await axios({
      method: "POST",
      url: `http://localhost:8080/api/like/${postId}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      data: { like: 1 }
    }).then((result) => {
      console.log(result);
      setLikes(result.data.like);
    });
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button onClick={liked}>J'aime</Button>
      💜
      {likes}
    </div>
  );
}

import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import Button from "@mui/material/Button";
import { ClickAwayListener } from "@mui/material";

export default function LikePost(post) {
  const token = JSON.parse(localStorage.getItem("tokens"));
  const postId = post.id;
  const [likes, setLikes] = useState([]);
  var click = false;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/like/${postId}`, {
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
      url: `http://localhost:3000/api/like/${postId}`,
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
    <div>
      <div style={{ display: "flex" }}>
        <Button onClick={liked}>J'aime</Button>
        <p>
          💜
          {likes}
        </p>
      </div>
    </div>
  );
}

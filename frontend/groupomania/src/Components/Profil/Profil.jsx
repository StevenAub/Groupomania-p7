import * as React from "react";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import imgProfil from "../../Assets/profil.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Comment from "../Comments/Comments";

export default function GetUser() {
  const token = JSON.parse(localStorage.getItem("tokens"));

  const idRequest = useParams();
  const id = idRequest.id;
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/user/${id}`, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setUser(res.data.GetUser);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/user/${id}/post`, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setPosts(res.data.GetPost);
      })
      .catch((err) => console.log(err));
  }, [id]);
  console.log(posts);
  return (
    <div>
      <Header />{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(78, 81, 102, 0.6)"
        }}
      >
        <Stack direction="row" spacing={2} style={{ margin: "15px" }}>
          <Avatar
            alt={user.username}
            src={user.imgProfil}
            sx={{ width: 100, height: 100 }}
          />
          <h1 style={{ borderBottom: "solid 1px black" }}>{user.username}</h1>
        </Stack>

        {posts?.map((post, index) => (
          <Card
            sx={{
              width: 750,
              maxWidth: 750,
              minWidth: 200,
              marginTop: 5
            }}
            key={`${post.title}-${index}`}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              border: "solid 1px #4E5166 ",
              boxShadow: "5px 5px 5px #4E5166"
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image={post.imgUrl}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                onClick={function postId() {
                  window.location = `/home/post/${post.id}`;
                  console.log(post.userId);
                }}
              >
                Commenter
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

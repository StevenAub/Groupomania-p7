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
  const idRequest = useParams();
  const id = idRequest.id;
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/user/${id}`, {
        method: "GET"
      })
      .then((res) => {
        setUser(res.data.GetUser);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/user/${id}/post`, {
        method: "GET"
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
          alignItems: "center"
        }}
      >
        <Stack direction="row" spacing={2}>
          <Avatar alt={user.username} src={imgProfil} />
          <h2>{user.username}</h2>
        </Stack>

        {posts?.map((post, index) => (
          <Card sx={{ maxWidth: 450 }} key={`${post.title}-${index}`}>
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

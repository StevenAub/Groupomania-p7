import * as React from "react";
import Header from "../Header/Header";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import SettingPost from "../Posts/SettingPost";
import LikePost from "../Like/Likes";

export default function GetUser() {
  const token = JSON.parse(localStorage.getItem("tokens"));

  const idRequest = useParams();
  const id = idRequest.id;
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/${id}`, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setUser(res.data.GetUser);
      })
      .catch((err) => console.log(err));
  }, [id, token]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/${id}/post`, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setPosts(res.data.GetPost);
      })
      .catch((err) => console.log(err));
  }, [id, token]);
  return (
    <div>
      <Header />{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3%"
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
              width: "100%",
              maxWidth: 750,
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
            {" "}
            <SettingPost id={post.id} />
            <CardActionArea>
              {post.imgUrl ? (
                <Link to={`/home/post/${post.id}`}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={post.imgUrl}
                    alt="green iguana"
                  />{" "}
                </Link>
              ) : (
                <div></div>
              )}
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
              <Link to={`/home/post/${post.id}`}>
                <Button size="small">Commenter</Button>
              </Link>
              <LikePost id={post.id} />
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

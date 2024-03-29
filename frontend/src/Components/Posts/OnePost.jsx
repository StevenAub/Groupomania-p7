import Header from "../Header/Header";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import Comment from "../Comments/Comments";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import LikePost from "../Like/Likes";
import SettingPost from "./SettingPost";

function GetOnedata() {
  const id = useParams();
  const token = JSON.parse(localStorage.getItem("tokens"));
  const userId = JSON.parse(localStorage.getItem("UserId"));
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/api/post/${id.id}`, {
      headers: { authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => setPost(data.GetPost));
  }, [id.id, token]);

  const username = post.User?.username;
  const imgProfil = post.User?.imgProfil;

  return (
    <div>
      <Header />
      <div
        style={{
          paddingTop: "2%",
          margin: "0px 5%"
        }}
      >
        <Stack justifyContent="center" alignItems="center">
          <Card
            sx={{
              width: "100%",
              maxWidth: 800,
              margin: 3
            }}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              border: "solid 1px #4E5166 ",
              boxShadow: "5px 5px 5px #4E5166"
            }}
          >
            {post.UserId === userId.userId || userId.isAdmin === true ? (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {" "}
                <SettingPost id={{ postId: post.id, userId: post.UserId }} />
              </div>
            ) : (
              <div></div>
            )}
            <CardContent>
              {" "}
              <Link to={`/home/user/${post.UserId}`}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  style={{
                    display: "flex",
                    margin: "10px 10px 30px 10px"
                  }}
                >
                  <Avatar
                    alt={`photo de profil de ${username}`}
                    style={{
                      marginRight: "10px"
                    }}
                    src={imgProfil}
                  />
                  <h3
                    style={{
                      margin: "0",
                      display: "flex",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "#4E5166"
                    }}
                  >
                    {username}
                  </h3>
                </Typography>{" "}
              </Link>
            </CardContent>
            <div>
              {post.imgUrl ? (
                <CardMedia
                  component="img"
                  image={post.imgUrl}
                  alt={`photo du post ${post.title}`}
                  style={{
                    objectFit: "contain",
                    width: "99%",
                    margin: "auto",
                    cursor: "pointer"
                  }}
                />
              ) : (
                <div></div>
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ marginBottom: "20px" }}
                >
                  {post.content}
                </Typography>{" "}
                <LikePost id={id.id} />
              </CardContent>
            </div>
          </Card>
          <Comment />
        </Stack>
      </div>
    </div>
  );
}
export default GetOnedata;

import Header from "../Header/Header";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import Comment from "../Comments/Comments";
import styled from "styled-components";
import DeletePost from "./DeletePost";
import { useState, useEffect } from "react";
import ModifyPost from "./ModifyPost";
import Avatar from "@mui/material/Avatar";
import imgProfil from "../../Assets/profil.jpg";
import LikePost from "../Like/Likes";
const StyledDivComment = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

function GetOnedata() {
  const id = useParams();

  const token = JSON.parse(localStorage.getItem("tokens"));

  const userId = JSON.parse(localStorage.getItem("UserId"));
  const [post, setPost] = useState({});
  console.log(userId);

  useEffect(() => {
    fetch(`http://localhost:3000/api/post/${id.id}`, {
      headers: { authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => setPost(data.GetPost));
  }, [id.id, token]);

  const username = post.User?.username;
  return (
    <div>
      <Header />
      <div
        style={{ backgroundColor: "rgba(78, 81, 102, 0.6)", paddingTop: "2%" }}
      >
        <Stack justifyContent="center" alignItems="center" spacing={2}>
          <Card
            sx={{ width: 750, maxWidth: 750, minWidth: 200, marginTop: 5 }}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              border: "solid 1px #4E5166 ",
              boxShadow: "5px 5px 5px #4E5166"
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{
                  display: "flex",
                  margin: "10px 10px 30px 10px"
                }}
              >
                <Avatar
                  alt="dkkd"
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
                  onClick={() => {
                    window.location = `/home/user/${post.UserId}`;
                  }}
                >
                  {username}
                </h3>
              </Typography>
            </CardContent>
            <div>
              {post.imgUrl ? (
                <CardMedia
                  style={{
                    objectFit: "contain"
                  }}
                  component="img"
                  height="300"
                  image={post.imgUrl}
                  alt="green iguana"
                />
              ) : (
                <div></div>
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>{" "}
                {post.UserId === userId ? (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <ModifyPost />
                    <DeletePost />
                  </div>
                ) : (
                  <div></div>
                )}
              </CardContent>
            </div>
          </Card>
          <StyledDivComment>
            <Comment />
          </StyledDivComment>
        </Stack>
      </div>
    </div>
  );
}
export default GetOnedata;

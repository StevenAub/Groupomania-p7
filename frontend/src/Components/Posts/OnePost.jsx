import Header from "../Header/Header";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import Comment from "../Comments/Comments";
import styled from "styled-components";
import DeletePost from "./DeletePost";
import { useState, useEffect } from "react";
import ModifyPost from "./ModifyPost";
import Avatar from "@mui/material/Avatar";

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
        <Stack justifyContent="center" alignItems="center" spacing={2}>
          <Card
            sx={{
              width: "100%",
              maxWidth: 950,
              margin: 10
            }}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              border: "solid 1px #4E5166 ",
              boxShadow: "5px 5px 5px #4E5166"
            }}
          >
            <CardContent>
              {" "}
              <Link to={`/home/user/${post.UserId}`}>
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
                  alt="green iguana"
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
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>{" "}
                {post.UserId === userId.userId ? (
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
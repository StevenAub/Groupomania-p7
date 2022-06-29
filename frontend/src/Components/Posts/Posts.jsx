import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import LikePost from "../Like/Likes";
import SettingPost from "./SettingPost";

const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

async function getList() {
  const token = JSON.parse(localStorage.getItem("tokens"));
  return await fetch("http://localhost:8080/api/post", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((data) => data.json())
    .catch((err) => console.log(err));
}

function Post() {
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const userId = JSON.parse(localStorage.getItem("UserId"));
  const [post, setPost] = useState({ title: "", content: "" });
  const [file, setFile] = useState("");
  const token = JSON.parse(localStorage.getItem("tokens"));
  const [nameImage, setNameImage] = useState("");
  let newPost = true;
  const onChange = ({ target: { name, value } }) => {
    setPost((post) => ({ ...post, [name]: value }));
  };
  const onChangeImage = (e) => {
    const file = e.target.files[0] || undefined;
    setNameImage(file.name);
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    if (
      post.title.trim() === "" ||
      (file === "" && post.content.trim() === "")
    ) {
      setError(
        "Merci de remplir au moins le titre et la description ou une image! "
      );
      setDisplayError(true);
      return <div></div>;
    }
    e.preventDefault();

    if (file) {
      const Formdata = new FormData();
      Formdata.append("title", post.title);
      Formdata.append("content", post.content);
      Formdata.append("image", file);

      axios({
        method: "post",
        url: "http://localhost:8080/api/post",
        data: Formdata,

        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`
        }
      })
        .then(() => {
          if (newPost) {
            setAlert(true);
            document.forms["post"].reset();
            setDisplayError(false);
            setFile("");
            setPost({ title: "", content: "" });
            setNameImage("");
          }
        })
        .catch((err) => {
          setError(err.response.data.message);
          setDisplayError(true);
        });
    } else {
      axios({
        method: "post",
        url: "http://localhost:8080/api/post",
        data: post,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      })
        .then(() => {
          if (newPost) {
            setAlert(true);
            document.forms["post"].reset();
            setFile("");
            setPost({ title: "", content: "" });
            setDisplayError(false);
            setNameImage("");
          }
        })
        .catch((err) => {
          setError(err.response.data.message);
          setDisplayError(true);
        });
    }
  };

  function DisplayError() {
    if (displayError === true) {
      return (
        <div>
          <p>{error}</p>
        </div>
      );
    }
  }

  const onDeletePost = useCallback((postId) =>  {
    const index = list.findIndex(post => post.id === postId);
    setList(list => {
      const tmp = [...list];
      tmp.splice(index, 1);
      return tmp;
    });
  }, [list]);

  useEffect(() => {
    let newPost = true;
    if (list.length && !alert) {
      return;
    }
    getList().then((items) => {
      if (newPost) {
        setList(items.posts);
      }
    });
    return () => (newPost = false);
  }, [alert]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        if (newPost) {
          setAlert(false);
        }
      }, 100);
    }
  }, [alert, newPost]);

  return (
    <div
      style={{
        padding: "3% 5%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <form
        name="post"
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          border: "solid 1px #4E5166 ",
          boxShadow: "5px 5px 5px #4E5166",
          padding: "2%",
          width: "100%",
          maxWidth: 850
        }}
      >
        <DivInput>
          <TextField
            id="outlined-basic"
            label="Titre"
            value={post.title}
            name="title"
            multiline
            variant="outlined"
            rows={1}
            onChange={onChange}
            fullWidth
          ></TextField>{" "}
          <TextField
            id="outlined-basic"
            label="Description...(optionnel)"
            name="content"
            value={post.content}
            multiline
            variant="outlined"
            rows={3}
            onChange={onChange}
            fullWidth
          ></TextField>
        </DivInput>
        <DisplayError />
        <Button
          id="imgUrl"
          name="imgUrl"
          accept="image/png, image/jpeg, image/jpg"
          onChange={onChangeImage}
          component="label"
          style={{ marginRight: "15px" }}
        >
          <i className="fa-solid fa-file-image fa-2x"></i>
          <i className="fa-thin fa-plus fa-2x"></i>
          <input type="file" hidden /> {nameImage}
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Publier
        </Button>
      </form>
      {alert && <h2> Post publié !</h2>}
      <ul
        style={{
          padding: "0",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {list.length === 0 ? (
          <div>Aucun post disponnible actuellement</div>
        ) : (
          list?.map((post, index) => (
            <Card
              key={`${post.title}-${index}`}
              sx={{
                width: "100%",
                maxWidth: 850,
                marginTop: 5
              }}
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                border: "solid 1px #4E5166 ",
                boxShadow: "5px 5px 5px #4E5166",
                wordWrap: "break-word"
              }}
            >
              {post.UserId === userId.userId || userId.isAdmin === true ? (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {" "}
                  <SettingPost id={post.id} onDeletePost={onDeletePost} />
                </div>
              ) : (
                <div></div>
              )}
              <CardContent
                style={{
                  padding: "17px 0px 6px 0px"
                }}
              >
                <Link to={`user/${post.UserId}`}>
                  <Typography gutterBottom variant="h6" component="div">
                    <h3
                      style={{
                        margin: "0",
                        display: "flex",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "#4E5166"
                      }}
                    >
                      <Avatar
                        alt={post.User.username}
                        style={{
                          marginRight: "10px"
                        }}
                        src={post.User.imgProfil}
                      />
                      {post.User.username}
                    </h3>
                  </Typography>
                </Link>
              </CardContent>
              <div>
                {post.imgUrl ? (
                  <Link to={`post/${post.id}`}>
                    <CardMedia
                      component="img"
                      image={post.imgUrl}
                      alt="green iguana"
                      style={{
                        objectFit: "contain",
                        margin: "auto",
                        cursor: "pointer",
                        maxHeight: "550px",
                        width: "100%"
                      }}
                    />
                  </Link>
                ) : (
                  <div></div>
                )}
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.content}
                  </Typography>
                </CardContent>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "3%"
                  }}
                >
                  <Link to={`post/${post.id}`}>
                    <Button>Commenter</Button>
                  </Link>
                  <LikePost id={post.id} />
                </div>
              </div>
            </Card>
          ))
        )}
      </ul>
    </div>
  );
}

export default Post;

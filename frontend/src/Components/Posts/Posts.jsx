import * as React from "react";
import { useEffect, useState } from "react";
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

const token = JSON.parse(localStorage.getItem("tokens"));

const DivContainair = styled.div`
  padding: 30px;
  align-items: center;
  max-width: 50%;
  margin: auto;
`;
const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

async function getList() {
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
  const [post, setPost] = useState({ title: "", content: "" });
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);
  let newPost = true;

  const onChange = ({ target: { name, value } }) => {
    setPost((post) => ({ ...post, [name]: value }));
  };
  const onChangeImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  const handleSubmit = (e) => {
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
      }).then(() => {
        if (newPost) {
          setAlert(true);
          document.forms["post"].reset();
        }
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
      }).then(() => {
        if (newPost) {
          setAlert(true);
          document.forms["post"].reset();
        }
      });
    }
  };

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
      }, 1000);
    }
  }, [alert, newPost]);

  return (
    <div
      style={{
        margin: "auto",
        paddingTop: "3%",
        minWidth: "100%"
      }}
    >
      <form name="post">
        <DivContainair
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            border: "solid 1px #4E5166 ",
            boxShadow: "5px 5px 5px #4E5166"
          }}
        >
          <DivInput>
            <TextField
              id="outlined-basic"
              label="Titre"
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
              multiline
              variant="outlined"
              rows={3}
              onChange={onChange}
              fullWidth
            ></TextField>
          </DivInput>
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
            <input type="file" hidden />
          </Button>

          <Button variant="contained" onClick={handleSubmit}>
            Publier
          </Button>
        </DivContainair>
      </form>
      {alert && <h2> Post publié !</h2>}

      <div
        className="wrapper"
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <ul style={{ padding: "5%" }}>
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
                <CardContent
                  style={{
                    padding: "17px 0px 6px 0px"
                  }}
                >
                  <Link to={`user/${post.UserId}`}>
                    <Typography gutterBottom variant="h5" component="div">
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
                          width: "99%",
                          margin: "auto",
                          cursor: "pointer"
                        }}
                      />
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

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center"
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
    </div>
  );
}
/*                        window.location = `/home/user/${post.UserId}`;
 */
export default Post;

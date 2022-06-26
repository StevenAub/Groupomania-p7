/*import * as React from "react";
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
import SettingPost from "./SettingPost";
const token = JSON.parse(localStorage.getItem("tokens"));

const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

function Post3() {
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const userId = JSON.parse(localStorage.getItem("UserId"));
  const [post, setPost] = useState({ title: "", content: "" });
  const [file, setFile] = useState();
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
          setFile("");
          setPost({ title: "", content: "" });
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
        .then((res) => {
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
          setFile("");
          setPost({ title: "", content: "" });
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
    </div>
  );
}

export default Post3;
*/

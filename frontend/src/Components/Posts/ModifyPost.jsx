import * as React from "react";
import {
  IconButton,
  Stack,
  TextField,
  Button,
  Fade,
  Modal,
  Backdrop,
  styled
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Redirect, useNavigate } from "react-router-dom";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const Input = styled("input")({
  display: "none"
});

export default function ModifyPost(id) {
  let navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("tokens"));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [post, setPost] = useState({ title: "", content: "" });
  const [file, setFile] = useState();

  const onChange = ({ target: { name, value } }) => {
    setPost((post) => ({ ...post, [name]: value }));
  };
  const onChangeImage = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("post", post);

      axios({
        method: "put",
        url: `http://localhost:8080/api/post/${id.id}`,

        data: formData,
        headers: {
          Accept: "application/json",

          "Content-Type": "multipart/form-data",

          authorization: `Bearer ${token}`
        }
      })
        .then(function (response) {
          setOpen(false);
          navigate(`/home/post/${id.id}`);
        })
        .catch(function (response) {
          console.log(response);
        });
    }
    axios({
      method: "put",
      url: `http://localhost:8080/api/post/${id.id}`,

      data: post,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      }
    })
      .then(function (response) {
        setOpen(false);
        window.location.reload();
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  return (
    <div>
      <div>
        <Button onClick={handleOpen}>Modifier</Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <Stack sx={style}>
              <TextField
                id="standard-basic"
                label="Titre"
                variant="outlined"
                name="title"
                value={post.title}
                onChange={onChange}
              />
              <TextField
                id="standard-basic"
                label="Description"
                name="content"
                variant="outlined"
                value={post.content}
                onChange={onChange}
              />{" "}
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  name="imgUrl"
                  onChange={onChangeImage}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              <Button variant="contained" onClick={handleSubmit}>
                Modifier
              </Button>
            </Stack>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

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

export default function ModifyPost() {
  const token = JSON.parse(localStorage.getItem("tokens"));

  const id = useParams().id;
  console.log(id);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [post, setPost] = useState({ title: "", content: "" });
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);

  const onChange = ({ target: { name, value } }) => {
    setPost((post) => ({ ...post, [name]: value }));
    console.log(post);
  };
  const onChangeImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    console.log("file", image);
    setFile(e.target.files[0]);
    console.log(image);
    console.log(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("post", post);

      axios({
        method: "put",
        url: `http://localhost:8080/api/post/${id}`,

        data: formData,
        headers: {
          Accept: "application/json",

          "Content-Type": "multipart/form-data",

          authorization: `Bearer ${token}`
        }
      })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
    axios({
      method: "put",
      url: `http://localhost:8080/api/post/${id}`,

      data: post,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      }
    })
      .then(function (response) {})
      .catch(function (response) {
        //handle error
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
            <Box sx={style}>
              <TextField
                id="standard-basic"
                label="Titre"
                variant="standard"
                name="title"
                onChange={onChange}
              />
              <TextField
                id="standard-basic"
                label="Description"
                name="content"
                variant="standard"
                onChange={onChange}
              />{" "}
              <input
                type="file"
                id="imgUrl"
                name="imgUrl"
                accept="image/png, image/jpeg, image/jpg"
                onChange={onChangeImage}
              />
              <Button variant="contained" onClick={handleSubmit}>
                Modifier
              </Button>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

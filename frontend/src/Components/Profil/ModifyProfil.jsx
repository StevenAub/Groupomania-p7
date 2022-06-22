import * as React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";

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

export default function ModifyProfil() {
  let navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("UserId"));
  const token = JSON.parse(localStorage.getItem("tokens"));
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);

  function EmailError() {
    if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(user.email)) {
      return <div>Merci de rentrer une addresse e-mail valide!</div>;
    }
  }

  const onChange = ({ target: { name, value } }) => {
    setUser((user) => ({ ...user, [name]: value }));
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0] || undefined;
    setImage(URL.createObjectURL(file));
    setFile(e.target.files[0]);
  };

  const UpdateProfil = async (e) => {
    e.preventDefault();
    if (file) {
      const Formdata = new FormData();
      Formdata.append("image", file);
      await axios({
        method: "put",
        url: `http://localhost:8080/api/user/${id.userId}/img`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        data: Formdata
      }).then((res) => {
        navigate(`../home/user/${id.userId}`, { replace: true });
      });
    }

    await axios({
      method: "put",
      url: `http://localhost:8080/api/user/${id.userId}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      data: user
    }).then((res) => {
      navigate(`../home/user/${id.userId}`, { replace: true });
    });
  };

  const DeleteProfil = async (e) => {
    await axios
      .delete(`http://localhost:8080/api/user/${id.userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        axios.delete(`http://localhost:8080/api/user/${id.userId}/post`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        localStorage.removeItem("tokens");
        localStorage.removeItem("UserId");
        navigate(`../`, { replace: true });
      });
  };

  return (
    <div style={{}}>
      <Header />
      <form name="modifyProfil">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            margin: "auto",
            gap: "30px"
          }}
        >
          <TextField
            id="standard-basic"
            label="Nom d'utilisateur"
            variant="standard"
            name="username"
            onChange={onChange}
          />
          <TextField
            id="standard-basic"
            label="Addresse e-mail"
            name="email"
            variant="standard"
            onChange={onChange}
          />
          <EmailError />
          <TextField
            type="password"
            id="standard-basic"
            label="Mot de passe"
            name="password"
            variant="standard"
            onChange={onChange}
          />
          <input
            type="file"
            id="imgProdfil"
            name="imgProfil"
            accept="image/png, image/jpeg, image/jpg"
            onChange={onChangeImage}
          />
          <Button variant="contained" onClick={UpdateProfil}>
            Modifier mon profil
          </Button>
          <Button variant="contained" onClick={DeleteProfil}>
            Supprimer mon profil
          </Button>
        </div>
      </form>
    </div>
  );
}

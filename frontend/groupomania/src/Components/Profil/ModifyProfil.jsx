import * as React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
  const id = JSON.parse(localStorage.getItem("UserId"));
  const token = JSON.parse(localStorage.getItem("tokens"));

  console.log(id);

  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);
  console.log(user);

  const onChange = ({ target: { name, value } }) => {
    setUser((user) => ({ ...user, [name]: value }));
    console.log(user);
  };
  const onChangeImage = (e) => {
    const file = e.target.files[0] || undefined;
    setImage(URL.createObjectURL(file));
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const Formdata = new FormData();
      Formdata.append("image", file);
      await axios({
        method: "put",
        url: `http://localhost:3000/api/user/${id}/img`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        data: Formdata
      }).then((res) => {
        console.log(res);
      });
    }
    await axios({
      method: "put",
      url: `http://localhost:3000/api/user/${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      data: user
    }).then((res) => {
      console.log(res);
    });
  };
  const DeleteProfil = async (e) => {
    await axios.delete(`http://localhost:3000/api/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.location = "/";
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
          <Button variant="contained" onClick={handleSubmit}>
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

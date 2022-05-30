import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import TextField from "@mui/material/TextField";

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

export default function Inscription() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const userData = async () => {
    await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        username: userName,
        password: password
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        const MsgData = responseData.message;
        console.log(MsgData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Button onClick={handleOpen}>Inscription</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Inscription
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" }
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Adresse email"
              variant="outlined"
              onInput={onChangeEmail}
              name="email"
              value={email}
            />
            <TextField
              id="outlined-basic"
              label="Nom d'utilisateur"
              variant="outlined"
              onInput={onChangeUserName}
              name="username"
              value={userName}
            />
            <TextField
              id="outlined-basic"
              label="Mot de passe"
              variant="outlined"
              onInput={onChangePassword}
              name="password"
              value={password}
            />
          </Box>
          <Button variant="contained" onClick={userData}>
            S'inscrire
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

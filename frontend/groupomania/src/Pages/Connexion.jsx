import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import icon from "../Assets/icon.svg";
import styled from "styled-components";

//import styled from "@emotion/styled";

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

function Connexion() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const formError = document.querySelector(".formError");
  /*

  const MyCustomButton = styled(Button)`
    background-color: red;
    border-radius: 8px;
  `;*/

  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = ({ target: { name, value } }) => {
    setForm((form) => ({ ...form, [name]: value }));

    console.log(form);
  };

  const userData = async () => {
    await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (!responseData.data) {
          console.log(responseData.data);
          const MsgData = responseData.message;
          formError.textContent = MsgData;
        } else {
          const token = responseData.token;
          localStorage.setItem("tokens", JSON.stringify(token));

          window.location = "/home";
        }

        //const token = responseData.token;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Connexion
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Connexion
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
              onInput={onChange}
              name="email"
              value={form.email}
            />
            <TextField
              id="outlined-basic"
              label="Mot de passe"
              variant="outlined"
              onInput={onChange}
              name="password"
              value={form.password}
            />
          </Box>
          <p
            className="formError"
            style={{ color: "red", fontSize: ".9em" }}
          ></p>

          <Button variant="contained" onClick={userData}>
            Se connecter
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
function Inscription() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  /*
  const MyCustomButton = styled(Button)`
    background-color: red;
    border-radius: 8px;
  `;*/ const message = document.querySelector(".message");
  console.log(message);

  const [form, setForm] = useState({ email: "", username: "", password: "" });

  const onChange = ({ target: { name, value } }) => {
    setForm((form) => ({ ...form, [name]: value }));

    console.log(form);
  };

  const userData = async () => {
    await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("response" + responseData);
        const MsgData = responseData.message;
        message.textContent = MsgData;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Inscription
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Inscription
          </Typography>{" "}
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "80%" }
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Adresse email"
              variant="outlined"
              onInput={onChange}
              name="email"
              value={form.email}
            />
            <TextField
              id="outlined-basic"
              label="Nom d'utilisateur"
              variant="outlined"
              onInput={onChange}
              name="username"
              value={form.username}
            />
            <TextField
              id="outlined-basic"
              label="Mot de passe"
              variant="outlined"
              onInput={onChange}
              name="password"
              value={form.password}
            />
          </Box>
          <p className="message"></p>
          <Button variant="contained" onClick={userData}>
            S'inscrire
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
const StyledImg = styled.img`
  max-width: 35%;
  margin: auto;
`;
const StyledDiv = styled.div`
  margin: 8px auto;
`;
export default function LoginPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <StyledImg src={icon} />
      <StyledDiv>
        <Connexion />
      </StyledDiv>
      <StyledDiv>
        <Inscription />
      </StyledDiv>
    </div>
  );
}

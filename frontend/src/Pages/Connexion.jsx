import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import icon from "../Assets/icon.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

function Connexion() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("tokens"));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const onChange = ({ target: { name, value } }) => {
    setForm((form) => ({ ...form, [name]: value }));
  };
  const error = document.getElementsByClassName("error");

  const userData = async () => {
    await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,

        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (!responseData) {
          const MsgData = responseData.message;
          setErrorMsg(MsgData);
        } else {
          const token = responseData.token;
          localStorage.setItem("tokens", JSON.stringify(token));
          localStorage.setItem(
            "UserId",
            JSON.stringify({
              userId: responseData.data.id,
              isAdmin: responseData.data.isAdmin
            })
          );
          navigate("/home");
        }
      })
      .catch((error) => {
        error.textContent = errorMsg;
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button
        onClick={handleOpen}
        variant="outlined"
        style={{ margin: "5px", fontSize: ".7em" }}
      >
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
              type="password"
              value={form.password}
            />{" "}
            <p className="error"></p>{" "}
          </Box>
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
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onChange = ({ target: { name, value } }) => {
    setForm((form) => ({ ...form, [name]: value }));
  };

  const userData = async () => {
    await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then((responseData) => {
        setError(responseData.message || responseData.error);
        if (responseData.status === 201) {
          setMessage(responseData.message);
          setOpen(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setOpen(true);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div>
        <Button
          onClick={handleOpen}
          variant="contained"
          style={{ margin: "5px", fontSize: ".7em" }}
        >
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
            </Typography>
            <form id="inscription"></form>
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
                type="password"
                label="Mot de passe"
                variant="outlined"
                onInput={onChange}
                name="password"
                value={form.password}
              />
            </Box>
            <p>{error}</p>
            <Button variant="contained" onClick={userData}>
              S'inscrire
            </Button>
          </Box>
        </Modal>
      </div>
      <p style={{ fontSize: "0.8em", textAlign: "center" }}>{message}</p>
    </div>
  );
}
const StyledImg = styled.img`
  max-width: 55%;
  margin: auto;
`;
const StyledDiv = styled.div`
  margin: 8px auto;
  display: flex;
  flex-direction: column;
`;
export default function LoginPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5%"
      }}
    >
      <div
        style={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "5%"
        }}
      >
        <StyledImg src={icon} />
        <StyledDiv>
          <Connexion />
          <Inscription />
        </StyledDiv>
      </div>
    </div>
  );
}

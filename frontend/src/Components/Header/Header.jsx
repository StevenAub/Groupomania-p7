import * as React from "react";
import logo from "../../Assets/logo.svg";
import styled from "styled-components";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

const StyledImg = styled.img`
  width: 27%;
  min-width: 250px;
`;
const StyledDiv = styled.div`
  background-color: #ffd7d7;
  height: 5em;
  border-bottom: 2px solid #4e5166;
  display: flex;
  justify-content: center;
`;

function DisplayMyProfil() {
  const myId = JSON.parse(localStorage.getItem("UserId"));

  return (
    <div>
      {window.location.pathname === `/home/user/${myId.userId}` ? (
        <Link to={`/home/user/${myId.userId}/update`}>
          <Button size="small" variant="contained">
            Modifié mon profil
          </Button>
        </Link>
      ) : (
        <Link to={`/home/user/${myId.userId}`}>
          <Button
            style={{ height: "2rem", fontSize: ".6em" }}
            variant="contained"
          >
            Mon profil
          </Button>
        </Link>
      )}
    </div>
  );
}

export default function Header() {
  function disconnect() {
    localStorage.removeItem("tokens");
    localStorage.removeItem("UserId");
  }
  return (
    <div>
      {window.location.pathname !== "/home" ? (
        <Link to={`/home`}>
          <IoIosArrowRoundBack
            size={60}
            style={{ color: "black", margin: "auto 5px", position: "absolute" }}
          />
        </Link>
      ) : (
        <div style={{ margin: "auto 5px" }}></div>
      )}
      <StyledDiv>
        <StyledImg src={logo} />
      </StyledDiv>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "5px",
          borderBottom: " 2px solid #4e5166",
          justifyContent: "flex-end",
          backgroundColor: "rgba(78, 81, 102, .7)"
        }}
      >
        <DisplayMyProfil />
        <Link to={`/`}>
          <Button
            color="error"
            style={{ height: "2rem", fontSize: ".6em" }}
            variant="contained"
            onClick={disconnect}
          >
            Deconnexion
          </Button>
        </Link>
      </div>
    </div>
  );
}

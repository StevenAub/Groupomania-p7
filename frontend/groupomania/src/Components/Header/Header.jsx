import * as React from "react";
import logo from "../../Assets/logo.svg";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

import ModifyProfil from "../Profil/ModifyProfil";

const StyledImg = styled.img`
  width: 20%;
  margin: 1%;
`;
const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #ffd7d7;
  height: 5em;
  border-bottom: 2px solid #4e5166;
`;
const StyledInput = styled.input`
  width: 50%;
  margin: 1%;
  padding: 8%;
`;

function DisplayMyProfil() {
  const myId = JSON.parse(localStorage.getItem("UserId"));

  return (
    <div>
      {window.location.pathname === `/home/user/${myId}` ? (
        <div onClick={() => (window.location = `/home/user/${myId}/modify`)}>
          Modifié mon profil
        </div>
      ) : (
        <Button
          variant="outlined"
          onClick={() => (window.location = `/home/user/${myId}`)}
        >
          Mon profil
        </Button>
      )}
    </div>
  );
}

export default function Header() {
  function disconnect() {
    localStorage.removeItem("tokens");

    window.location = "/";
  }
  console.log(window.location.pathname);
  return (
    <div>
      <StyledDiv>
        {window.location.pathname !== "/home" ? (
          <IoIosArrowRoundBack
            size={60}
            style={{ color: "black", margin: "auto 5px" }}
            onClick={function back() {
              window.location = `/home`;
            }}
          />
        ) : (
          <div style={{ margin: "auto 5px" }}></div>
        )}
        <StyledImg src={logo} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px"
          }}
        >
          <DisplayMyProfil />
          <Button variant="outlined" onClick={disconnect}>
            Se déconnecter
          </Button>
        </div>
      </StyledDiv>
    </div>
  );
}

/*
function Search() {
  const token = JSON.parse(localStorage.getItem("tokens"));

  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/post", {
      headers: { authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => setDatas(data));
  }, [token]);

  const PostData = datas?.posts;
  const handleSearch = (e) => {
    let value = e.target.value;
    setSearch(value);
  };

  console.log(search);
  return (
    <>
      <div>
        <div className="search">
          <StyledInput
            type="text"
            name="searchBar"
            id="searchBar"
            placeholder="Rechercher sur groupomania"
            onChange={handleSearch}
          />
        </div>
        <div className="search_results">
          {PostData?.filter((val) => {
            return val.title.toLowerCase().includes(search.toLowerCase());
          }).map((val, index) => {
            return (
              <div className="search_result" key={val.title + index}>
                {val.title}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
*/

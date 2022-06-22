import * as React from "react";
import logo from "../../Assets/logo.svg";
import styled from "styled-components";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { IoIosArrowRoundBack } from "react-icons/io";

import ModifyProfil from "../Profil/ModifyProfil";
import { borderBottom } from "@mui/system";

const StyledImg = styled.img`
  width: 27%;
  margin-top: 1em;
`;
const StyledDiv = styled.div`
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
  console.log(window.location.pathname);
  return (
    <div>
      <StyledDiv>
        {window.location.pathname !== "/home" ? (
          <Link to={`/home`}>
            <IoIosArrowRoundBack
              size={60}
              style={{ color: "black", margin: "auto 5px" }}
            />
          </Link>
        ) : (
          <div style={{ margin: "auto 5px" }}></div>
        )}
        <StyledImg src={logo} />
      </StyledDiv>{" "}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "5px",
          borderBottom: " 2px solid #4e5166",
          justifyContent: "flex-end"
        }}
      >
        <DisplayMyProfil />
        <Link to={`/`}>
          <Button
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

/*
function Search() {
  const token = JSON.parse(localStorage.getItem("tokens"));

  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/post", {
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

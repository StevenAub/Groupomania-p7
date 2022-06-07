import logo from "../../Assets/logo.svg";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useFetch } from "../../Hooks/Hook";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
const StyledImg = styled.img`
  width: 20%;
  margin: 1%;
`;
const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(248, 17, 17, 0.1);
  height: 5em;
`;
const StyledInput = styled.input`
  width: 50%;
  margin: 1%;
  padding: 8%;
`;

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

/**/

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
        <Button variant="outlined" onClick={disconnect}>
          Se déconnecter
        </Button>
      </StyledDiv>
    </div>
  );
}

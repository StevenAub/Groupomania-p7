import Header from "../Header/Header";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import InputUnstyled, { InputUnstyledProps } from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Comment from "../Comments/Comments";
import style from "styled-components";
import DeletePost from "./DeletePost";

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  600: "#0072E5"
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027"
};

const StyledInputElement = styled("input")(
  ({ theme }) => `
  width: 100%;
  font-size: 0.875rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 8px;
  padding: 12px 12px;

  &:hover {
    background: ${theme.palette.mode === "dark" ? "" : grey[100]};
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[100]};
  }
`
);
const StyledDivComment = style.div`
  display: flex;
  flex-direction: column;
  width:70%
`;

const CustomInput = React.forwardRef(function CustomInput(
  props: InputUnstyledProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <InputUnstyled
      components={{ Input: StyledInputElement }}
      {...props}
      ref={ref}
    />
  );
});

function AddComment() {
  const idRequest = useParams();
  const id = idRequest.id;

  const token = JSON.parse(localStorage.getItem("tokens"));

  const [comment, setComment] = useState({});
  const onChange = (e) => {
    let value = e.target.value;
    console.log(value);
    setComment(value);
  };
  console.log(comment);
  const handleSubmit = async () => {
    await axios({
      method: "POST",
      url: `http://localhost:3000/api/post/${id}/comments`,
      data: { content: comment },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      <div>
        <CustomInput
          aria-label="Demo input"
          placeholder="Commenter..."
          onChange={onChange}
        ></CustomInput>{" "}
        <Button variant="outlined" onClick={handleSubmit}>
          Envoyer
        </Button>
      </div>
    </div>
  );
}

function GetOnedata() {
  const id = useParams();
  const user_name = JSON.parse(localStorage.getItem("username"));

  const token = JSON.parse(localStorage.getItem("tokens"));
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/api/post/${id.id}`, {
      headers: { authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => setPost(data.GetPost));
  }, [id.id, token]);

  console.log(post);
  return (
    <div>
      <Header />
      <div style={{ backgroundColor: "grey", paddingTop: "2%" }}>
        <Stack justifyContent="center" alignItems="center" spacing={2}>
          <Card sx={{ minWidth: 650, maxWidth: 650 }}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {user_name}
              </Typography>

              <DeletePost />
            </CardContent>
            <div>
              {post.imgUrl ? (
                <CardMedia
                  component="img"
                  height="300"
                  image={post.imgUrl}
                  alt="green iguana"
                />
              ) : (
                <div></div>
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
            </div>
          </Card>
          <StyledDivComment>
            <AddComment />
            <Comment />
          </StyledDivComment>
        </Stack>
      </div>
    </div>
  );
}
export default GetOnedata;

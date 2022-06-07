import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useFetch } from "../../Hooks/Hook";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function DisplayAllComment() {
  const user_name = JSON.parse(localStorage.getItem("username"));

  const idRequest = useParams();
  const id = idRequest.id;
  const token = JSON.parse(localStorage.getItem("tokens"));

  const [comment, setComment] = useState(false);

  // in the futur fetch comments from here
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/post/${id}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data.GetComment);
        const allComment = res.data.GetComment;
        console.log(allComment);
        setComment(allComment);
      })
      .catch("Une erreur est survenue lors du chargement de la page");
  }, [id, token]);
  console.log(comment);
  if (!comment) {
    return <div></div>;
  }
  return (
    <div>
      {comment?.map((comment, index) => (
        <Card sx={{ minWidth: 275 }} key={`${comment.content}-${index}`}>
          <CardContent>
            <Typography variant="h5" component="div">
              {user_name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {comment.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

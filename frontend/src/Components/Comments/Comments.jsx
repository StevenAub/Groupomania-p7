import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function DisplayAllComment() {
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState([]);
  let newComment = true;

  const idRequest = useParams();
  const id = idRequest.id;
  const token = JSON.parse(localStorage.getItem("tokens"));
  const userId = JSON.parse(localStorage.getItem("UserId"));
  console.log(userId);
  //const [comment, setComment] = useState(false);
  //Ajout d'un commentaire

  function AddComment() {
    const idRequest = useParams();
    const id = idRequest.id;
    const token = JSON.parse(localStorage.getItem("tokens"));
    const [comment, setComment] = useState("");

    const onChange = (e) => {
      let value = e.target.value;
      setComment(value);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();

      await axios({
        method: "POST",
        url: `http://localhost:8080/api/post/${id}/comments`,
        data: { content: comment },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then(() => {
          if (newComment) {
            setAlert(true);
            document.forms["comment"].reset();
          }
        })
        .catch((response) => {
          setError(response.response.data.message);
        });
    };

    return (
      <div>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            border: "solid 1px #4E5166 ",
            boxShadow: "5px 5px 5px #4E5166",
            maxWidth: "80%",
            margin: "auto"
          }}
        >
          <div
            style={{
              margin: "15px 15px"
            }}
          >
            <form name="comment">
              <TextField
                id="outlined-basic"
                name="content"
                label="Commentaire..."
                multiline
                variant="outlined"
                rows={2}
                onChange={onChange}
                fullWidth
                required
              ></TextField>
              <p>{error}</p>
              <div>
                <Button
                  style={{ margin: "5px" }}
                  variant="outlined"
                  onClick={handleSubmit}
                >
                  Envoyer
                </Button>
              </div>{" "}
            </form>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    let newComment = true;
    if (list.length && !alert) {
      return;
    }
    axios
      .get(`http://localhost:8080/api/post/${id}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((items) => {
        console.log(items);
        if (newComment) {
          setList(items.data.GetComment);
        }
      })
      .catch("Une erreur est survenue lors du chargement de la page");
  }, [alert, id, list.length, token]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        if (newComment) {
          setAlert(false);
        }
      }, 1000);
    }
  }, [alert, newComment]);

  if (!list) {
    return <div></div>;
  }

  function Delete(comment) {
    console.log(comment);
    const commentId = comment.target.id;
    console.log(commentId);
    axios
      .delete(`http://localhost:8080/api/post/${id}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log(res);
        setAlert(true);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <AddComment />

      {list?.map((comment, index) => (
        <Card
          sx={{ minWidth: 275, margin: 2 }}
          key={`${comment.content}-${index}`}
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            border: "solid 1px #4E5166 ",
            boxShadow: "5px 5px 5px #4E5166"
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              style={{
                display: "flex",
                margin: "10px 10px 30px 10px"
              }}
            >
              <h3
                style={{
                  margin: "0",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#4E5166"
                }}
                onClick={() => {
                  window.location = `/home/user/${comment.UserId}`;
                }}
              >
                <Avatar
                  alt={comment.User.username}
                  style={{
                    marginRight: "10px"
                  }}
                  src={comment.User.imgProfil}
                />
                {comment.User.username}
              </h3>
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {comment.content}
            </Typography>
            {comment.UserId === userId.userId ? (
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "flex-end"
                }}
                id={comment.id}
                onClick={Delete}
              >
                <Button id={comment.id}> ❌ Supprimé commentaire</Button>
              </div>
            ) : (
              <div></div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

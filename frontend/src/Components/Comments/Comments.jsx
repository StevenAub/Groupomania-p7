import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function DisplayAllComment() {
  const token = JSON.parse(localStorage.getItem("tokens"));
  const userId = JSON.parse(localStorage.getItem("UserId"));
  const idRequest = useParams();
  const id = idRequest.id;
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState([]);
  const [displayError, setDisplayError] = useState(false);
  let newComment = true;

  function AddComment() {
    const [comment, setComment] = useState("");

    const onChange = (e) => {
      let value = e.target.value;
      setComment(value);
    };

    function DisplayError() {
      if (displayError === true) {
        return (
          <div>
            <p>{error}</p>
          </div>
        );
      }
    }

    const handleSubmit = async (e) => {
      if (comment.trim() === "") {
        setError("Merci de remplir le champ!");
        setDisplayError(true);
        return <div></div>;
      }
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
            setDisplayError(false);
            setComment("");
          }
        })
        .catch((response) => {
          if (response) {
            setError(response.response.data.message);
            setDisplayError(true);
          }
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
            maxWidth: 800,
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
                fullWidth
                onChange={onChange}
              ></TextField>
              <DisplayError />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  style={{ margin: "5px", width: "100%" }}
                  variant="contained"
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
      }, 100);
    }
  }, [alert, newComment]);

  if (!list) {
    return <div></div>;
  }

  function Delete(comment) {
    const commentId = comment.target.id;
    axios
      .delete(`http://localhost:8080/api/post/${id}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setAlert(true);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div style={{ width: "100%" }}>
      <AddComment />

      {list?.map((comment, index) => (
        <Card
          key={`${comment.content}-${index}`}
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            border: "solid 1px #4E5166 ",
            boxShadow: "5px 5px 5px #4E5166",
            maxWidth: 800,
            margin: "3% auto"
          }}
        >
          {comment.UserId === userId.userId || userId.isAdmin === true ? (
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "flex-end"
              }}
              id={comment.id}
              onClick={Delete}
            >
              <Button
                id={comment.id}
                style={{ position: "absolute", margin: "20px 15px 0 0" }}
              >
                ❌
              </Button>
            </div>
          ) : (
            <div></div>
          )}
          <CardContent>
            <Link to={`/home/user/${comment.UserId}`}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "25px"
                }}
              >
                <Avatar
                  alt={`photo de profil de ${comment.User.username}`}
                  style={{
                    marginRight: "10px"
                  }}
                  src={comment.User.imgProfil}
                />
                <Typography variant="h6" color="text.secondary" style={{}}>
                  {comment.User.username}
                </Typography>
              </div>
            </Link>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ marginBottom: "20px", wordWrap: "break-word" }}
            >
              {comment.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

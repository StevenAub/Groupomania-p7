import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import imgProfil from "../../Assets/profil.jpg";
import axios from "axios";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import LikePost from "../Like/Likes";
import { width } from "@mui/system";

const token = JSON.parse(localStorage.getItem("tokens"));

const DivContainair = styled.div`
  padding: 30px;
  align-items: center;
  max-width: 50%;
  margin: auto;
`;
const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

async function getList() {
  return await fetch("http://localhost:3000/api/post", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((data) => data.json())
    .catch((err) => console.log(err));
}

function Post() {
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState(false);
  const [post, setPost] = useState({ title: "", content: "" });
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);
  let newPost = true;

  const onChange = ({ target: { name, value } }) => {
    setPost((post) => ({ ...post, [name]: value }));
  };
  const onChangeImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const Formdata = new FormData();
      Formdata.append("title", post.title);
      Formdata.append("content", post.content);

      Formdata.append("image", file);

      axios({
        method: "post",
        url: "http://localhost:3000/api/post",
        data: Formdata,

        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`
        }
      }).then(() => {
        if (newPost) {
          setAlert(true);
          document.forms["post"].reset();
        }
      });
    } else {
      axios({
        method: "post",
        url: "http://localhost:3000/api/post",
        data: post,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      }).then(() => {
        if (newPost) {
          setAlert(true);
          document.forms["post"].reset();
        }
      });
    }
  };

  useEffect(() => {
    let newPost = true;
    if (list.length && !alert) {
      return;
    }
    getList().then((items) => {
      if (newPost) {
        setList(items.posts);
      }
    });
    return () => (newPost = false);
  }, [alert]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        if (newPost) {
          setAlert(false);
        }
      }, 1000);
    }
  }, [alert, newPost]);

  /*Primaire : #FD2D01
● Secondaire : #FFD7D7
● Tertiaire : #4E5166*/
  return (
    <div
      style={{
        backgroundColor: "rgba(78, 81, 102, 0.6)",
        paddingTop: "3%"
      }}
    >
      <form name="post">
        <DivContainair
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            border: "solid 1px #4E5166 ",
            boxShadow: "5px 5px 5px #4E5166"
          }}
        >
          <DivInput>
            <TextField
              id="outlined-basic"
              label="Titre"
              name="title"
              multiline
              variant="outlined"
              rows={1}
              onChange={onChange}
              fullWidth
            ></TextField>{" "}
            <TextField
              id="outlined-basic"
              label="Description...(optionnel)"
              name="content"
              multiline
              variant="outlined"
              rows={3}
              onChange={onChange}
              fullWidth
            ></TextField>
          </DivInput>
          <input
            type="file"
            id="imgUrl"
            name="imgUrl"
            accept="image/png, image/jpeg, image/jpg"
            onChange={onChangeImage}
          />
          <button onClick={handleSubmit}>Publier</button>
        </DivContainair>
      </form>
      {alert && <h2> Post publié !</h2>}

      <div
        className="wrapper"
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <ul style={{ padding: "0" }}>
          {list.length === 0 ? (
            <div>Aucun post disponnible actuellement</div>
          ) : (
            list?.map((post, index) => (
              <Card
                key={`${post.title}-${index}`}
                sx={{
                  width: 750,
                  maxWidth: 750,
                  minWidth: 200,
                  marginTop: 5
                }}
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "solid 1px #4E5166 ",
                  boxShadow: "5px 5px 5px #4E5166"
                }}
              >
                <CardContent
                  style={{
                    padding: "17px 0px 6px 0px"
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    <h3
                      style={{
                        margin: "0",
                        display: "flex",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "#4E5166"
                      }}
                      onClick={() => {
                        window.location = `/home/user/${post.UserId}`;
                      }}
                    >
                      <Avatar
                        alt={post.User.username}
                        style={{
                          marginRight: "10px"
                        }}
                        src={imgProfil}
                      />

                      {post.User.username}
                    </h3>
                  </Typography>
                </CardContent>
                <div>
                  {post.imgUrl ? (
                    <CardMedia
                      onClick={function postId() {
                        window.location = `/home/post/${post.id}`;
                      }}
                      component="img"
                      height="400"
                      image={post.imgUrl}
                      alt="green iguana"
                      style={{
                        objectFit: "cover",
                        width: "99%",
                        margin: "auto",
                        cursor: "pointer"
                      }}
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

                  <div style={{ display: "flex" }}>
                    <Button
                      size="small"
                      onClick={function postId() {
                        window.location = `/home/post/${post.id}`;
                      }}
                    >
                      Commenter
                    </Button>
                    <LikePost id={post.id} />
                  </div>
                </div>
              </Card>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Post;

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
    value.length > 2 && setSearch(value);
  };

  console.log(search);
  return (
    <>
      <div>
        <div className="search">
          <input
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
          }).map((post, index) => (
            <Stack justifyContent="center" alignItems="center" spacing={2}>
              <Card
                key={`${post.title}-${index}`}
                sx={{ minWidth: 600, maxWidth: 600, minHeight: 350 }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={post.imgUrl}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Commenter</Button>
                  <Button size="small">Partager</Button>
                </CardActions>
              </Card>
            </Stack>
          ))}
        </div>
      </div>
    </>
  );
}

export default function AllPost() {
  const { data, error } = useFetch(`http://localhost:3000/api/post`);

  const PostData = data?.posts;

  if (error) {
    return <span>Oups il y a eu un problème</span>;
  }

  return (
    <div>
      {" "}
      <Search />
      <div>
        <Stack justifyContent="center" alignItems="center" spacing={2}>
          {PostData?.map((post, index) => (
            <Card
              key={`${post.title}-${index}`}
              sx={{ minWidth: 600, maxWidth: 600, minHeight: 350 }}
            >
              <CardMedia
                component="img"
                height="300"
                image={post.imgUrl}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Commenter</Button>
                <Button size="small">Partager</Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      </div>
    </div>
  );
}
*/

import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
const url = "http://localhost:3000/api/post";
//const token = JSON.parse(localStorage.getItem("tokens"));

const DivContainair = styled.div`
  padding: 30px;

  align-items: center;
  border: 1px blue solid;
`;

function NewPost() {
  const [post, setPost] = useState({ title: "", content: "" });
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);

  const onChange = ({ target: { name, value } }) => {
    setPost((post) => ({ ...post, [name]: value }));
    console.log(post);
  };
  const onChangeImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    console.log("file", image);
    setFile(e.target.files[0]);
    console.log(image);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const Formdata = new FormData();
      Formdata.append("title", post.title);
      Formdata.append("content", post.content);

      Formdata.append("image", file);
      console.log(Formdata);

      axios({
        method: "post",
        url: url,
        data: Formdata,

        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    } else {
      axios({
        method: "post",
        url: url,
        data: post,
        headers: { "Content-Type": "application/json" }
      })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
  };

  return (
    <DivContainair>
      <input
        type="text"
        name="title"
        placeholder="Titre"
        onInput={onChange}
        value={post.title}
      />

      <textarea
        type="text"
        name="content"
        placeholder="Text(optional)"
        onInput={onChange}
        value={post.content}
      />

      <input
        type="file"
        id="imgUrl"
        name="imgUrl"
        accept="image/png, image/jpeg, image/jpg"
        onInput={(event) => onChangeImage(event)}
        value={post.imgUrl}
      />
      <button onClick={handleSubmit}>Publier</button>
    </DivContainair>
  );
}

export default NewPost;

import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

export default function DeletePost({id, onDeletePost}) {
  const token = JSON.parse(localStorage.getItem("tokens"));
  const user = JSON.parse(localStorage.getItem("UserId"));


  function deletePost() {
    onDeletePost(id);
    axios
      .delete(`http://localhost:8080/api/post/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        onDeletePost(id);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Button onClick={deletePost} color="error">
        Supprimer le post
      </Button>
    </div>
  );
}

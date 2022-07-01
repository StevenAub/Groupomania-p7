import axios from "axios";
import Button from "@mui/material/Button";

export default function DeletePost({ id, onDeletePost }) {
  const token = JSON.parse(localStorage.getItem("tokens"));

  function deletePost() {
    axios
      .delete(`http://localhost:8080/api/post/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        window.location.reload();
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

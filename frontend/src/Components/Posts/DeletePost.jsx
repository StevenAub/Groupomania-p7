import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";

export default function DeletePost() {
  const token = JSON.parse(localStorage.getItem("tokens"));

  const idRequest = useParams();
  const id = idRequest.id;
  console.log(id);
  function Delete() {
    console.log("hey");
    axios.delete(`http://localhost:8080/api/post/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.location = "/home";
  }

  return (
    <div>
      <Button onClick={Delete}>❌ Supprimer le post</Button>
    </div>
  );
}
